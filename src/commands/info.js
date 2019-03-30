const { prefix } = require("./../config");

module.exports = {
  execute(message) {
    const data = [];
    data.push(
      "I am a bot that you can use to move messages to different channels."
    );
    data.push("`!mv message_id #channel`");
    data.push("");
    data.push(`**Prefix**: ${prefix}`);
    data.push("**Developer**: MarkNjunge");
    data.push("**Source Code**: https://github.com/MarkNjunge/dMover");

    message.author.send(data);
  }
};
