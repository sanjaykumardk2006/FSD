// Email utility functions using nodemailer with Gmail
const nodemailer = require('nodemailer');

// Create transporter DYNAMICALLY to ensure env vars are loaded
const getTransporter = () => {
  console.log('📧 Creating SMTP transporter with:');
  console.log('   GMAIL_USER:', process.env.GMAIL_USER ? '✓ Set' : '❌ NOT SET');
  console.log('   GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD ? '✓ Set' : '❌ NOT SET');
  
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

// Check credentials on startup
if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
  console.warn('⚠️  WARNING: Gmail credentials not configured. Email sending will fail!');
  console.warn('Set GMAIL_USER and GMAIL_PASSWORD environment variables.');
}

const sendEmail = async (to, subject, text, html) => {
  try {
    // Verify credentials are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      const error = 'Gmail credentials missing! Set GMAIL_USER and GMAIL_PASSWORD env vars';
      console.error('❌', error);
      return false;
    }

    const transporter = getTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.GMAIL_USER || 'support@freelancerhub.com',
      to,
      subject,
      text,
      html: html || text,
    };

    console.log(`📤 Sending email to: ${to}`);
    console.log(`   From: ${mailOptions.from}`);
    console.log(`   Subject: ${subject}`);

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully!`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(`   To: ${to}`);
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    if (error.response) {
      console.error(`   Response: ${error.response}`);
    }
    return false;
  }
};

const sendContactFormEmail = async (recipientEmail, name, senderEmail, mobileNumber, city, message) => {
  try {
    const subject = `New Contact Form Submission from ${name}`;
    const text = `
      Name: ${name}
      Email: ${senderEmail}
      Mobile: ${mobileNumber}
      City: ${city}
      Message: ${message}
    `;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0f1f35;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Mobile:</strong> ${mobileNumber}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 10px; border-left: 4px solid #ff6b6b;">
          ${message.replace(/\n/g, '<br>')}
        </p>
      </div>
    `;

    return await sendEmail(recipientEmail, subject, text, html);
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
};

const sendProposalRejectionEmail = async (freelancerEmail, jobTitle, reason) => {
  const subject = `Proposal Rejected for "${jobTitle}"`;
  const text = `Your proposal was rejected.\nReason: ${reason}`;
  return await sendEmail(freelancerEmail, subject, text);
};

const sendProjectUpdateReminder = async (email, projectTitle) => {
  const subject = `Reminder: Update your project status for "${projectTitle}"`;
  const text = `Please update your project progress. No update in 2 days.`;
  return await sendEmail(email, subject, text);
};

const testSMTP = async () => {
  try {
    console.log('🧪 Testing SMTP configuration...');
    
    // Check if credentials are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.warn('⚠️  Credentials not set!');
      return {
        success: false,
        error: 'Gmail credentials not configured',
        details: {
          GMAIL_USER_SET: !!process.env.GMAIL_USER,
          GMAIL_PASSWORD_SET: !!process.env.GMAIL_PASSWORD
        }
      };
    }

    const transporter = getTransporter();
    console.log('📡 Verifying SMTP connection...');
    
    const result = await transporter.verify();
    console.log('✅ SMTP connection verified!');
    
    return {
      success: result,
      message: 'SMTP connection successful',
      email: process.env.GMAIL_USER,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ SMTP verification failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: 'Check Gmail credentials, allow less secure apps, or use App Password',
      hint: 'Visit: https://myaccount.google.com/apppasswords'
    };
  }
};
      error: error.message,
      details: 'Check Gmail credentials and allow less secure apps or use App Password'
    };
  }
};

module.exports = {
  sendEmail,
  sendContactFormEmail,
  sendProposalRejectionEmail,
  sendProjectUpdateReminder,
  testSMTP,
};
