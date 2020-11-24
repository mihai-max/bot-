const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const config = require('./config.json');
bot.prefix = config.prefix;

bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split('.').pop() === 'js');

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.log(`Loaded ${jsFiles.length} commands`);
});

bot.errMsg = (message) => {
  message.channel.send('Error 404: Please enter command properly. There was a **Syntax Error in the command**.');
}
bot.permMsg = (message) => {
  message.channel.send('I don\'t have permission to do this. :(');
}

String.prototype.capitalize = function(allWords) {
  if (allWords) return this.split(/ +/g).map(str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1)).join(' ');
  else return this.toLowerCase().charAt() + this.toLowerCase(0).substring(1);
}

bot.on('ready', () => {
  console.log(`Bot ${bot.user.username} is on`);
  bot.user.setGame('Merry Christmas | *help | Say Something Kind');
  bot.user.setStatus('Playing')
});

bot.on('message', (message) => {
  if (message.content.startsWith(bot.prefix)) {
    let args = message.content.substring(bot.prefix.length).trim().split(/ +/g);
    let cmd = bot.commands.get(args[0].toLowerCase());
    if (cmd) cmd.run(bot, message, args);
  }
});

bot.login(process.env.TOKEN)