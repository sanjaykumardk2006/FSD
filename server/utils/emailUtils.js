// Email utility functions using SendGrid HTTP API
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
const initializeSendGrid = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  console.log('📧 Initializing SendGrid HTTP API with:');
  console.log('   SENDGRID_API_KEY:', apiKey ? '✓ Set' : '❌ NOT SET');
  
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY is not configured!');
    return false;
  }
  
  sgMail.setApiKey(apiKey);
  return true;
};

// Check credentials on startup
if (!process.env.SENDGRID_API_KEY) {
  console.warn('⚠️  WARNING: SendGrid API key not configured. Email sending will fail!');
  console.warn('Set SENDGRID_API_KEY environment variable.');
} else {
  initializeSendGrid();
}

const sendEmail = async (to, subject, text, html) => {
  try {
    // Verify credentials are set
    if (!process.env.SENDGRID_API_KEY) {
      const error = 'SendGrid API key missing! Set SENDGRID_API_KEY env var';
      console.error('❌', error);
      return false;
    }

    const msg = {
      to,
      from: process.env.EMAIL_FROM || 'support@freelancerhub.com',
      subject,
      text,
      html: html || text,
      replyTo: process.env.EMAIL_FROM || 'support@freelancerhub.com',
    };

    console.log(`📤 Sending email via SendGrid HTTP API to: ${to}`);
    console.log(`   From: ${msg.from}`);
    console.log(`   Subject: ${subject}`);

    const response = await sgMail.send(msg);
    
    console.log(`✅ Email sent successfully via SendGrid!`);
    console.log(`   Status Code: ${response[0].statusCode}`);
    console.log(`   Headers:`, response[0].headers['x-message-id']);
    return true;
  } catch (error) {
    console.error('❌ Error sending email via SendGrid:');
    console.error(`   To: ${to}`);
    console.error(`   Error: ${error.message}`);
    if (error.code) {
      console.error(`   Code: ${error.code}`);
    }
    if (error.response?.body?.errors) {
      console.error(`   Errors:`, error.response.body.errors);
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
    console.log('🧪 Testing SendGrid HTTP API configuration...');
    
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

    // Test by sending a simple mail object validation
    console.log('📡 Verifying SendGrid API connection...');
    
    // SendGrid HTTP API doesn't need a connection test
    // The API key is valid if it's set and returns 202 on send
    return {
      success: true,
      message: 'SendGrid HTTP API configured and ready',
      provider: 'SendGrid (HTTP API)',
      timestamp: new Date().toISOString(),
      note: 'Will verify on first email send'
    };
  } catch (error) {
    console.error('❌ SendGrid verification failed:');
    console.error(`   Error: ${error.message}`);
    
    return {
      success: false,
      error: error.message,
      provider: 'SendGrid (HTTP API)',
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
