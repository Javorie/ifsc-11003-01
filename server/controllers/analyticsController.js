const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');

const rating = (acc) => {
  if (acc < 60) return 'Needs Improvement';
  if (acc <= 80) return 'Moderate';
  return 'Strong';
};

exports.getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    const attempts = await QuizAttempt.find({ userId: req.user.id }).sort({ completedAt: 1 }).lean();

    const domainPerformance = user.domainStats.map((d) => {
      const accuracy = d.answered ? Number(((d.correct / d.answered) * 100).toFixed(1)) : 0;
      return { ...d, accuracy, recommendation: rating(accuracy) };
    });

    const sorted = [...domainPerformance].sort((a, b) => a.accuracy - b.accuracy);
    const weakestDomain = sorted[0] || null;
    const strongestDomain = sorted[sorted.length - 1] || null;

    const totalAnswered = domainPerformance.reduce((sum, d) => sum + d.answered, 0);
    const totalCorrect = domainPerformance.reduce((sum, d) => sum + d.correct, 0);
    const overallAccuracy = totalAnswered ? Number(((totalCorrect / totalAnswered) * 100).toFixed(1)) : 0;

    const trend = attempts.map((a) => ({
      date: new Date(a.completedAt).toISOString().slice(0, 10),
      accuracy: Number(((a.correctCount / a.totalQuestions) * 100).toFixed(1)),
      score: a.score
    }));

    const recentMistakes = attempts
      .flatMap((a) => a.answers.filter((ans) => !ans.isCorrect).map((ans) => ({ ...ans, attemptId: a._id, completedAt: a.completedAt })))
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 10);

    return res.json({
      domainPerformance,
      overallAccuracy,
      totalAnswered,
      weakestDomain,
      strongestDomain,
      trend,
      recentMistakes
    });
  } catch (error) {
    return res.status(500).json({ message: 'Analytics fetch failed', error: error.message });
  }
};
