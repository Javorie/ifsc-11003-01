const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connectDb = async () => {
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};

module.exports = connectDb;
