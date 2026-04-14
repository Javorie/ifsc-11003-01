const express = require('express');
const auth = require('../middleware/auth');
const { getQuestions, submitAttempt } = require('../controllers/quizController');

const router = express.Router();
router.get('/questions', auth, getQuestions);
router.post('/submit', auth, submitAttempt);

module.exports = router;
