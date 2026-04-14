const mongoose = require('mongoose');

const domainStatsSchema = new mongoose.Schema(
  {
    domain: { type: String, required: true },
    answered: { type: Number, default: 0 },
    correct: { type: Number, default: 0 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domainStats: [domainStatsSchema],
    quizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAttempt' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
