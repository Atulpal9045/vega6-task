const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, profileImage } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ email, password: hashedPassword, profileImage });
    await newUser.save();
    res.status(200).json({ message: 'Registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await user.findOne({ email });
    if (!userDetail) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, userDetail.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: userDetail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: {id: userDetail._id, email: userDetail.email} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
