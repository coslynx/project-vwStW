// scheduledMessages.js (JavaScript)

const Discord = require('discord.js');
const client = new Discord.Client();
const { scheduledMessages } = require('../../config/discordConfig');

client.once('ready', () => {
  console.log('Scheduled Messages Bot is online!');
});

client.on('message', message => {
  if (message.content.startsWith('!schedule')) {
    const args = message.content.slice('!schedule'.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'add') {
      const [time, channel, content] = args;
      scheduleMessage(time, channel, content);
      message.channel.send('Message scheduled successfully!');
    } else if (command === 'remove') {
      const [time] = args;
      removeScheduledMessage(time);
      message.channel.send('Message removed from schedule!');
    }
  }
});

function scheduleMessage(time, channel, content) {
  const scheduledMessage = {
    time: time,
    channel: channel,
    content: content
  };

  scheduledMessages.push(scheduledMessage);
}

function removeScheduledMessage(time) {
  const index = scheduledMessages.findIndex(message => message.time === time);

  if (index !== -1) {
    scheduledMessages.splice(index, 1);
  }
}

client.login('your-token-here');