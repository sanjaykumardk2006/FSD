const cron = require('node-cron');
const Project = require('../models/Project');
const User = require('../models/User');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const { sendProjectUpdateReminder } = require('../utils/emailUtils');

// Run at 8:00 AM on Monday and Thursday
const scheduleProjectReminders = (io) => {
  cron.schedule('0 8 * * 1,4', async () => {
    try {
      // Find all active projects
      const projects = await Project.find({
        status: 'Active',
      }).populate('freelancerId', 'email username');

      for (const project of projects) {
        // Send email reminder
        await sendProjectUpdateReminder(project.freelancerId.email, project.jobId);

        // Create notification
        const notification = await Notification.create({
          userId: project.freelancerId._id,
          type: 'reminder',
          title: 'Project Update Reminder',
          message: 'Please update your project status.',
          relatedId: project._id,
        });

        if (io) {
          io.to(project.freelancerId._id.toString()).emit('new_notification', notification);
        }

        // Send System Message in the chat
        const sysMsg = new Message({
          projectId: project._id,
          message: 'System Reminder: Please provide a status update for this project.',
          isSystemMessage: true,
        });
        await sysMsg.save();

        if (io) {
          io.to(project._id.toString()).emit('receive_message', sysMsg);
        }
      }

      console.log(`Project reminder cron: Sent reminders to ${projects.length} active projects`);
    } catch (error) {
      console.error('Error in project reminder cron:', error);
    }
  });
};

module.exports = { scheduleProjectReminders };
