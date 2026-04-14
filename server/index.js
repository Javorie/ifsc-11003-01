const express = require('express');
const cors = require('cors');
const connectDb = require('./db');
const { port, clientUrl } = require('./config');

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

connectDb()
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
