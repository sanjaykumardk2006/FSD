const cron = require('node-cron');
const Project = require('../models/Project');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { sendProjectUpdateReminder } = require('../utils/emailUtils');

// Run every 24 hours (at 8 AM)
const scheduleProjectReminders = () => {
  cron.schedule('0 8 * * *', async () => {
    try {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

      // Find projects with no updates in 2 days
      const projects = await Project.find({
        status: 'Active',
        lastUpdateDate: { $lt: twoDaysAgo },
      }).populate('freelancerId', 'email username');

      for (const project of projects) {
        // Send email reminder
        await sendProjectUpdateReminder(project.freelancerId.email, project.jobId);

        // Create notification
        await Notification.create({
          userId: project.freelancerId._id,
          type: 'reminder',
          title: 'Project Update Reminder',
          message: 'Please update your project status. No update in 2 days.',
          relatedId: project._id,
        });
      }

      console.log(`Project reminder cron: Sent reminders to ${projects.length} freelancers`);
    } catch (error) {
      console.error('Error in project reminder cron:', error);
    }
  });
};

module.exports = { scheduleProjectReminders };
