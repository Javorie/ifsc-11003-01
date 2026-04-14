const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    domain: String,
    selectedAnswer: Number,
    correctAnswer: Number,
    isCorrect: Boolean,
    responseTime: Number,
    pointsAwarded: Number,
    explanation: String
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mode: { type: String, enum: ['game', 'study', 'simulation'], default: 'game' },
    score: { type: Number, default: 0 },
    totalQuestions: Number,
    correctCount: Number,
    answers: [answerSchema],
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
