// roleManagement.js (JavaScript)

// Import necessary modules and files
const Discord = require('discord.js');
const { prefix } = require('../config/discordConfig');

// Function to manage roles for users
const manageRoles = (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'assignrole') {
    const roleName = args.join(' ');
    const role = message.guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
      message.channel.send('Role not found!');
      return;
    }

    if (message.member.roles.cache.has(role.id)) {
      message.channel.send('You already have that role!');
      return;
    }

    try {
      message.member.roles.add(role);
      message.channel.send(`Role ${roleName} has been assigned to you successfully.`);
    } catch (error) {
      console.error('Error assigning role:', error);
      message.channel.send('An error occurred while assigning the role.');
    }
  } else if (command === 'removerole') {
    const roleName = args.join(' ');
    const role = message.guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
      message.channel.send('Role not found!');
      return;
    }

    if (!message.member.roles.cache.has(role.id)) {
      message.channel.send('You do not have that role!');
      return;
    }

    try {
      message.member.roles.remove(role);
      message.channel.send(`Role ${roleName} has been removed from you successfully.`);
    } catch (error) {
      console.error('Error removing role:', error);
      message.channel.send('An error occurred while removing the role.');
    }
  }
};

module.exports = {
  manageRoles,
};