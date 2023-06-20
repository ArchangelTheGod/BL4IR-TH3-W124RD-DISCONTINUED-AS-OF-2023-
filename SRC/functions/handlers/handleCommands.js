const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const chalk = require(`chalk`);
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = "YOUR CLIENT ID HERE";
    const guildId = ("YOUR SERVER ID(s) HERE");

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN2);
    try {
      console.log(chalk.blue(`Loading Commands...`));

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log(chalk.green(`Commands Loaded.`));
    } catch (error) {
      console.error(error);
    }
  };
};
