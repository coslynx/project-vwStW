// warn.js (JavaScript)

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warn a user for rule violations',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to warn');
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('User Warned')
      .setAuthor(user.tag, user.displayAvatarURL())
      .addField('Moderator', message.author.tag)
      .addField('Reason', reason)
      .setTimestamp();

    const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
    if (!channel) {
      return message.reply('Could not find mod-logs channel');
    }

    channel.send(embed);
    user.send(`You have been warned in ${message.guild.name} for: ${reason}`);
  },
};