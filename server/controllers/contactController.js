const { sendEmail, testSMTP } = require('../utils/emailUtils');
const ContactMessage = require('../models/ContactMessage');
const { body, validationResult } = require('express-validator');

exports.testSMTPConfig = async (req, res) => {
  console.log('🔍 SMTP Test Endpoint Called');
  console.log('Environment Variables:');
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  GMAIL_USER:', process.env.GMAIL_USER ? 'Set ✓' : 'NOT SET ❌');
  console.log('  GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD ? 'Set ✓' : 'NOT SET ❌');
  console.log('  EMAIL_FROM:', process.env.EMAIL_FROM || 'Not set (using GMAIL_USER)');
  
  const result = await testSMTP();
  
  const envStatus = {
    GMAIL_USER_SET: !!process.env.GMAIL_USER,
    GMAIL_PASSWORD_SET: !!process.env.GMAIL_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
  };
  
  const response = { ...result, env: envStatus };
  console.log('📤 Test SMTP Response:', JSON.stringify(response, null, 2));
  
  res.json(response);
};

// Submit contact form
exports.submitContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobileNumber').trim().notEmpty().withMessage('Mobile number is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, mobileNumber, city, message } = req.body;

      console.log('📝 Processing contact form submission:');
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${email}`);
      console.log(`   City: ${city}`);

      // Save message to database
      const contactMessage = new ContactMessage({
        name,
        email,
        mobileNumber,
        city,
        message,
      });
      
      await contactMessage.save();
      console.log('✅ Contact message saved to database:', contactMessage._id);

      // Send confirmation email to user's email
      try {
        const userSubject = 'Thank You - We Received Your Message';
        const userText = `Hello ${name},\n\nThank you for contacting us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nFreelancer Hub Team`;
        
        const userHtml = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #0f1f35;">Thank You for Contacting Us!</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
            
            <h3>Your Message Details:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${mobileNumber}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 10px; border-left: 4px solid #ff6b6b;">
              ${message.replace(/\n/g, '<br>')}
            </p>
            
            <p style="margin-top: 30px; color: #666;">Best regards,<br>Freelancer Hub Team</p>
          </div>
        `;

        console.log('📧 Sending confirmation email to user:', email);
        const userEmailResult = await sendEmail(email, userSubject, userText, userHtml);
        if (userEmailResult) {
          console.log(`✅ Confirmation email sent to user: ${email}`);
        } else {
          console.warn(`⚠️ Failed to send confirmation email to user: ${email}`);
        }
      } catch (emailError) {
        console.error('❌ User confirmation email error:', emailError.message);
      }

      // Send admin notification email with all details
      try {
        const adminSubject = `New Contact Form Submission from ${name}`;
        const adminText = `
          New contact form submission received:
          
          Name: ${name}
          Email: ${email}
          Phone: ${mobileNumber}
          City: ${city}
          Message: ${message}
        `;
        
        const adminHtml = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #0f1f35;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${mobileNumber}">${mobileNumber}</a></p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 10px; border-left: 4px solid #ff6b6b;">
              ${message.replace(/\n/g, '<br>')}
            </p>
            <p style="margin-top: 30px; color: #666;">Sent from Freelancer Hub Contact Form</p>
          </div>
        `;

        console.log('📧 Sending admin notification to: sanjaykumardk.24cse@kongu.edu');
        const adminEmailResult = await sendEmail('sanjaykumardk.24cse@kongu.edu', adminSubject, adminText, adminHtml);
        if (adminEmailResult) {
          console.log('✅ Admin notification email sent successfully to sanjaykumardk.24cse@kongu.edu');
        } else {
          console.error('❌ Failed to send admin notification email');
        }
      } catch (emailError) {
        console.error('❌ Admin notification email error:', emailError.message);
      }

      res.status(200).json({ message: 'Contact form submitted successfully. Check your email for confirmation!' });
    } catch (error) {
      console.error('❌ Submit contact form error:', error);
      res.status(500).json({ message: 'Error submitting contact form. Please try again.' });
    }
  },
];
