//Authentication Require
require("dotenv").config();
const { TOKEN, databaseToken } = process.env;
const { Client, Collection, InteractionType, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, MessageManager, Events, ButtonStyle, ChannelType } = require("discord.js");
const fs = require("fs");

//Client
const client = new Client({ intents: 32767, partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

//handlers and collectors
client.commands = new Collection();
client.cooldown = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

//Anti-Crash
const failsafe = require('node:process');

failsafe.on('unhandledRejection', async (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

failsafe.on('uncaughtException', (err) => {
  console.log('Uncaught Exception', err);
});

failsafe.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('Uncaught Exception Monitor', err, origin);
});

//Command Handling
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

//System Authentication
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(TOKEN);
// (async () => {
//   await connect(databaseToken).catch(console.error);
// })();