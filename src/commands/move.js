const winston = require("winston");

module.exports = {
  execute(message, args) {
    // Reject messages that are not in a guild
    if (!message.guild) {
      message.reply("I only reply in guilds!");
      return;
    }

    // Only follow owner's commands
    // TODO allow owner to add other users
    // if (message.author.id !== message.guild.ownerID) {
    //   message.reply("Only the owner can move");
    //   return;
    // }

    // Reject messages with the wrong number of arguments
    if (args.length < 2) {
      message.reply(
        "I need two arguments! Message ID and destination channel!"
      );
      return;
    }

    const wrongMessageId = args[0];
    const tagetChannelId = args[1].replace("<#", "").replace(">", "");

    message.channel
      .fetchMessage(wrongMessageId)
      .then(wrongMessage => {
        winston.debug(
          `Wrong message (${wrongMessageId}): ${wrongMessage.content.substring(
            0,
            20
          )}...`
        );

        // Get target channel
        const channel = message.guild.channels.get(tagetChannelId);
        if (!channel) {
          throw new Error("Could not find channel???");
        }
        winston.debug(`Tagret channel (${tagetChannelId}): #${channel.name}`);

        // Create response
        const data = [];
        data.push(`<@${wrongMessage.author.id}> said,`);
        data.push(`\`\`\`\n${wrongMessage.content}\`\`\``);
        channel.send(data);

        // Delete command message and wrong message to clean channel
        message.delete();
        wrongMessage.delete();
      })
      .catch(err => {
        winston.error(err.message);
        message.reply(err.message);
      });
  }
};
