const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@freelancerhub.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin account already exists!');
      process.exit(0);
    }

    // Need to use the same logic User model uses for password hashing,
    // but the User model uses a pre-save hook, so we just pass the plain text password.
    const newAdmin = new User({
      username: 'Admin',
      email: adminEmail,
      password: 'admin123',
      role: 'Admin',
      isActive: true,
      isVerified: true
    });

    await newAdmin.save();
    console.log('Admin account created successfully!');
    console.log('Email: admin@freelancerhub.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exit(1);
  }
};

createAdmin();
