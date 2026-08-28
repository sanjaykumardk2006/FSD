const crypto = require('crypto');
const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/mailer');
const { body, validationResult } = require('express-validator');
const emailValidator = require('deep-email-validator');

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

      // Check if email actually exists and is not fake
      const emailValidationResult = await emailValidator.validate(email);
      if (!emailValidationResult.valid) {
        return res.status(400).json({ 
          message: `Please provide a valid, existing email address. Reason: ${emailValidationResult.validators[emailValidationResult.reason]?.reason || 'Invalid email'}` 
        });
      }

      const verificationToken = crypto.randomBytes(32).toString('hex');

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
        profile: role === 'Freelancer' && service ? { skills: [service] } : undefined,
        verificationToken,
      });

      await user.save();
      
      // Send verification email (non-blocking)
      sendVerificationEmail(user.email, verificationToken);

      res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
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

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({ message: 'Your account has been deactivated. Please contact support.' });
      }

      // Update lastLogin
      user.lastLogin = Date.now();
      await user.save({ validateBeforeSave: false });

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

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -email -mobileNumber -resetPasswordToken -verificationToken');
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
    const { bio, skills, experience, resume, profileImage, companyName, entityType, country, mobileNumber, hourlyRate, githubUrl, linkedinUrl, portfolio } = req.body;

    const updateData = {
      'profile.bio': bio,
      'profile.skills': skills,
      'profile.experience': experience,
      'profile.resume': resume,
    };
    
    // Additional Freelancer Fields
    if (hourlyRate !== undefined) updateData['profile.hourlyRate'] = hourlyRate;
    if (githubUrl !== undefined) updateData['profile.githubUrl'] = githubUrl;
    if (linkedinUrl !== undefined) updateData['profile.linkedinUrl'] = linkedinUrl;
    if (portfolio !== undefined) updateData['profile.portfolio'] = portfolio;
    
    // Client specific fields on the root document
    if (companyName !== undefined) updateData.companyName = companyName;
    if (entityType !== undefined) updateData.entityType = entityType;
    if (country !== undefined) updateData.country = country;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;

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

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

exports.resetPassword = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }

    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
      }

      user.password = password; // Will be hashed by pre-save hook
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error during password reset' });
    }
  }
];
