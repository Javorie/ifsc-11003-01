const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    choices: { type: [String], required: true, validate: (arr) => arr.length === 4 },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    domain: { type: String, required: true },
    difficulty: { type: Number, default: 1, min: 1, max: 3 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
