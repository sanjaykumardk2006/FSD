const { sendEmail } = require('../utils/emailUtils');
const ContactMessage = require('../models/ContactMessage');
const { body, validationResult } = require('express-validator');

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

        sendEmail(email, userSubject, userText, userHtml).catch(e => console.warn('User email error:', e.message));
      } catch (emailError) {
        console.warn('Confirmation email sending setup failed:', emailError.message);
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

        sendEmail('sanjaykumardk.24cse@kongu.edu', adminSubject, adminText, adminHtml).catch(e => console.warn('Admin email error:', e.message));
      } catch (emailError) {
        console.warn('Admin notification email setup failed:', emailError.message);
      }

      res.status(200).json({ message: 'Contact form submitted successfully. Check your email for confirmation!' });
    } catch (error) {
      console.error('Submit contact form error:', error);
      res.status(500).json({ message: 'Error submitting contact form. Please try again.' });
    }
  },
];
