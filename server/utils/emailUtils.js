// Email utility functions using SendGrid
const nodemailer = require('nodemailer');

// Create transporter using SendGrid SMTP
const getTransporter = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  console.log('📧 Creating SendGrid SMTP transporter with:');
  console.log('   SENDGRID_API_KEY:', apiKey ? '✓ Set' : '❌ NOT SET');
  
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY is not configured!');
  }
  
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',  // SendGrid requires 'apikey' as username
      pass: apiKey,    // API key as password
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    pool: {
      maxConnections: 5,
      maxMessages: 100,
    },
  });
};

// Check credentials on startup
if (!process.env.SENDGRID_API_KEY) {
  console.warn('⚠️  WARNING: SendGrid API key not configured. Email sending will fail!');
  console.warn('Set SENDGRID_API_KEY environment variable.');
}

const sendEmail = async (to, subject, text, html) => {
  try {
    // Verify credentials are set
    if (!process.env.SENDGRID_API_KEY) {
      const error = 'SendGrid API key missing! Set SENDGRID_API_KEY env var';
      console.error('❌', error);
      return false;
    }

    const transporter = getTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'support@freelancerhub.com',
      to,
      subject,
      text,
      html: html || text,
    };

    console.log(`📤 Sending email via SendGrid to: ${to}`);
    console.log(`   From: ${mailOptions.from}`);
    console.log(`   Subject: ${subject}`);

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully via SendGrid!`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email via SendGrid:');
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
    console.log('🧪 Testing SendGrid SMTP configuration...');
    
    // Check if API key is set
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('⚠️  SendGrid API key not set!');
      return {
        success: false,
        error: 'SendGrid API key not configured',
        details: {
          SENDGRID_API_KEY_SET: !!process.env.SENDGRID_API_KEY,
        }
      };
    }

    const transporter = getTransporter();
    console.log('📡 Verifying SendGrid SMTP connection...');
    
    const result = await transporter.verify();
    console.log('✅ SendGrid SMTP connection verified!');
    
    return {
      success: result,
      message: 'SendGrid SMTP connection successful',
      provider: 'SendGrid',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ SendGrid verification failed:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    
    return {
      success: false,
      error: error.message,
      code: error.code,
      provider: 'SendGrid',
      details: 'Verify your SendGrid API key is correct',
      hint: 'Visit: https://app.sendgrid.com/settings/api_keys'
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
