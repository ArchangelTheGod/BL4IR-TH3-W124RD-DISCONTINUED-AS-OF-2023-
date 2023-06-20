const chalk = require('chalk');
const Client = require("discord.js")
const mongoose = require('mongoose')
const config = require('./../../../config.json')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 10 * 1000);
    console.log(chalk.yellow(`${client.user.tag} has logged in sucessfully!`));
    await mongoose.connect(config.mongodb || '',{
      keepAlive: true,
    });
  },
};
