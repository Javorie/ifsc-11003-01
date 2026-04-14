const connectDb = require('./db');
const Question = require('./models/Question');
const questions = require('./data/questions');

(async () => {
  try {
    await connectDb();
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log(`Seeded ${questions.length} questions.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
