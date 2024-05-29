// File: logging.js (JavaScript)

// Import necessary libraries and modules
const fs = require('fs');

// Function to log moderation actions
const logAction = (action, user, moderator) => {
  const logMessage = `${new Date().toLocaleString()} - ${moderator} performed ${action} on ${user}\n`;

  fs.appendFile('moderation.log', logMessage, (err) => {
    if (err) {
      console.error('Error logging action:', err);
    }
  });
};

// Export the logAction function
module.exports = { logAction };