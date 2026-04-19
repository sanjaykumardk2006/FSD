const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { body, validationResult } = require('express-validator');

exports.signup = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['Client', 'Freelancer']).withMessage('Role must be Client or Freelancer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        role,
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully. Please login.' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error during signup' });
    }
  },
];

exports.login = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      // Check if user exists and password matches
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate token
      const token = generateToken(user._id, user.role);

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },
];

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { bio, skills, experience, hourlyRate } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        'profile.bio': bio,
        'profile.skills': skills,
        'profile.experience': experience,
        'profile.hourlyRate': hourlyRate,
      },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
