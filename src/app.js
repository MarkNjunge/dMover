require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const winston = require("winston");
const { prefix } = require("./config");
const move = require("./move");

// Create logs folder
if (!fs.existsSync(__dirname + "/../logs")) {
  fs.mkdirSync(__dirname + "/../logs");
}
// Initialize logger
const { combine, timestamp, printf } = winston.format;
const customFormat = printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`
);
winston.configure({
  level: "debug",
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: __dirname + "/../logs/app.log",
      format: combine(timestamp(), customFormat)
    })
  ]
});

const client = new Discord.Client();

client.on("ready", () => {
  winston.info(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    return;
  }

  winston.debug(
    `${msg.guild ? msg.guild.name + " -> " : ""}` +
      `${msg.author.username}#${msg.author.discriminator} -> ${msg.content}`
  );

  const args = msg.content
    .slice(prefix.length)
    .split(/ +/)
    .filter(v => v !== "");

  try {
    if (args.length > 0) {
      move.execute(msg, args);
    }
  } catch (error) {
    winston.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});

client.login("NTYxMjU4MzY2MzAzODYyODA0.D3_4kw.LyKFajd82R94G6xWvJwuUDWPkH8");
