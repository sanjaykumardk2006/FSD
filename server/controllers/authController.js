const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { body, validationResult } = require('express-validator');

exports.signup = [
  // username validation is moved inside the controller since it's auto-generated for Freelancers
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['Client', 'Freelancer']).withMessage('Role must be Client or Freelancer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      let { username, email, password, role, firstName, lastName, companyName, country, mobileNumber, service, entityType } = req.body;

      if (!username) {
        if (entityType === 'Company') {
          if (!companyName) {
            return res.status(400).json({ message: 'Company name is required' });
          }
          username = `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 10000)}`;
        } else {
          if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required' });
          }
          username = `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${lastName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 10000)}`;
        }
      }

      // Check if user already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: 'username exist' });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        role,
        firstName,
        lastName,
        companyName,
        country,
        mobileNumber,
        entityType: entityType || 'Self-employed',
        profile: role === 'Freelancer' && service ? { skills: [service] } : undefined
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
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      // Check if user exists and password matches
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'invalid email and password' });
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
    const { bio, skills, experience, hourlyRate, profileImage } = req.body;

    const updateData = {
      'profile.bio': bio,
      'profile.skills': skills,
      'profile.experience': experience,
      'profile.hourlyRate': hourlyRate,
    };

    if (profileImage !== undefined) {
      updateData['profile.profileImage'] = profileImage;
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
