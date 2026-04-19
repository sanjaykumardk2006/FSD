// Email utility functions (can be extended with nodemailer)

const sendEmail = async (to, subject, message) => {
  try {
    // TODO: Integrate with email service (nodemailer, SendGrid, etc.)
    console.log(`Email to: ${to}, Subject: ${subject}, Message: ${message}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const sendProposalRejectionEmail = (freelancerEmail, jobTitle, reason) => {
  const subject = `Proposal Rejected for "${jobTitle}"`;
  const message = `Your proposal was rejected.\nReason: ${reason}`;
  return sendEmail(freelancerEmail, subject, message);
};

const sendProjectUpdateReminder = (email, projectTitle) => {
  const subject = `Reminder: Update your project status for "${projectTitle}"`;
  const message = `Please update your project progress. No update in 2 days.`;
  return sendEmail(email, subject, message);
};

module.exports = {
  sendEmail,
  sendProposalRejectionEmail,
  sendProjectUpdateReminder,
};
