// ban.js (JavaScript)

const Discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'Banned by moderation bot',
          })
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch((err) => {
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this server");
      }
    } else {
      message.reply("You didn't mention the user to ban");
    }
  },
};