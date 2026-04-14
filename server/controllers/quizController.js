const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const calculatePoints = (isCorrect, responseTime, timerSeconds) => {
  if (!isCorrect) return 0;
  const speedFactor = Math.max(0.2, (timerSeconds - responseTime) / timerSeconds);
  return Math.round(600 + speedFactor * 400);
};

exports.getQuestions = async (req, res) => {
  try {
    const {
      domain,
      mode = 'game',
      count = 10,
      adaptive = 'false',
      timer = 20,
      difficulty = 1
    } = req.query;

    const filter = {};
    if (domain) filter.domain = domain;
    if (mode === 'simulation') {
      const simQuestions = await Question.aggregate([{ $sample: { size: 90 } }]);
      return res.json({ timer: 60, questions: simQuestions });
    }

    if (adaptive === 'true') {
      const user = await User.findById(req.user.id);
      const sortedWeakness = [...user.domainStats].sort((a, b) => {
        const aAcc = a.answered ? a.correct / a.answered : 0;
        const bAcc = b.answered ? b.correct / b.answered : 0;
        return aAcc - bAcc;
      });
      const weakest = sortedWeakness[0]?.domain;
      if (weakest) filter.domain = weakest;
      filter.difficulty = Number(difficulty);
    }

    const questions = await Question.aggregate([{ $match: filter }, { $sample: { size: Number(count) } }]);
    return res.json({ timer: Number(timer), questions: shuffle(questions) });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load questions', error: error.message });
  }
};

exports.submitAttempt = async (req, res) => {
  try {
    const { mode, answers, timerSeconds = 20 } = req.body;
    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionMap = Object.fromEntries(questions.map((q) => [q._id.toString(), q]));

    let score = 0;
    let correctCount = 0;
    const gradedAnswers = answers.map((answer) => {
      const q = questionMap[answer.questionId];
      const isCorrect = q.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctCount += 1;
      const points = calculatePoints(isCorrect, answer.responseTime || timerSeconds, timerSeconds);
      score += points;
      return {
        questionId: q._id,
        domain: q.domain,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        responseTime: answer.responseTime || timerSeconds,
        pointsAwarded: points,
        explanation: q.explanation
      };
    });

    const attempt = await QuizAttempt.create({
      userId: req.user.id,
      mode,
      score,
      totalQuestions: gradedAnswers.length,
      correctCount,
      answers: gradedAnswers
    });

    const user = await User.findById(req.user.id);
    const domainMap = Object.fromEntries(user.domainStats.map((d) => [d.domain, d]));
    gradedAnswers.forEach((a) => {
      domainMap[a.domain].answered += 1;
      if (a.isCorrect) domainMap[a.domain].correct += 1;
    });
    user.domainStats = Object.values(domainMap);
    user.quizHistory.push(attempt._id);
    await user.save();

    return res.status(201).json(attempt);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to submit quiz', error: error.message });
  }
};
