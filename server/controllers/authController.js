const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config');
const { DOMAINS } = require('../utils/domainConstants');

const signToken = (user) => jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      domainStats: DOMAINS.map((domain) => ({ domain, answered: 0, correct: 0 }))
    });

    return res.status(201).json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    return res.json({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
