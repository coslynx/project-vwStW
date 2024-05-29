// mute.js (JavaScript)

const { Permissions } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mute a user temporarily',
  execute(message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return message.reply('You do not have permission to use this command');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please specify a user to mute');
    }

    const mainRole = message.guild.roles.cache.find(role => role.name === 'member');
    const muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

    if (!mainRole || !muteRole) {
      return message.reply('Roles not found, please set them up first');
    }

    const member = message.guild.members.cache.get(target.id);
    member.roles.remove(mainRole.id);
    member.roles.add(muteRole.id);

    message.channel.send(`${target} has been muted`);
  },
};