const nodemailer = require('nodemailer');

// Setup Ethereal or actual SMTP transporter
const createTransporter = async () => {
  // If actual SMTP credentials are provided in .env, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Otherwise, fallback to Ethereal Email for development/testing
  console.log('No SMTP credentials found in .env. Creating Ethereal test account...');
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

exports.sendVerificationEmail = async (email, token, req) => {
  try {
    const transporter = await createTransporter();
    
    // Determine the base URL dynamically based on frontend (port 5173 typically in Vite)
    // You might want to use process.env.CLIENT_URL in production
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const verifyUrl = `${baseUrl}/verify-email/${token}`;

    const info = await transporter.sendMail({
      from: '"Freelancer Hub" <noreply@freelancerhub.com>',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Welcome to Freelancer Hub!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #10b981; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verifyUrl}</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    console.log('Verification email sent: %s', info.messageId);
    if (info.messageId && info.messageId.includes('@ethereal.email')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

exports.sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = await createTransporter();
    
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    const info = await transporter.sendMail({
      from: '"Freelancer Hub" <noreply@freelancerhub.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link is valid for 1 hour. If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    });

    console.log('Password reset email sent: %s', info.messageId);
    if (info.messageId && info.messageId.includes('@ethereal.email')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
