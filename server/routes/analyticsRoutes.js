const express = require('express');
const auth = require('../middleware/auth');
const { getAnalytics } = require('../controllers/analyticsController');

const router = express.Router();
router.get('/', auth, getAnalytics);

module.exports = router;
