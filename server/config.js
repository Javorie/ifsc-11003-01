const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/secplus_trainer',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
