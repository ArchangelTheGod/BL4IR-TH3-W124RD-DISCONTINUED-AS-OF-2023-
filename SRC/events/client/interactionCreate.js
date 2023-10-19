const { InteractionType, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      const cooldownData = `${interaction.user.id}/${interaction.commandName}`
      if (client.cooldown.has(cooldownData)){
        const time = ms(client.cooldown.get(cooldownData) - Date.now());

        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Red")
            .setTitle("Info | Error | Cooldown")
            .setDescription(`Slow it down bud! You have ${time} remaining.`)]
        })
      }

      interaction.setCooldown = (time) => {
        client.cooldown.set(cooldownData, Date.now() + time);
        setTimeout(() => client.cooldown.delete(cooldownData), time);
      }

      if (command.owner == true) {
        if (interaction.user.id !== '782357589723578409') return await interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor("Red")
            .setTitle("Info | Error")
            .setDescription("You cannot use this command. You are not a developer.")
            .setFooter({ text: "Error Type: Not a Developer!"})]
        })
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Error **400** Command couldn't be processed.",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("Error! There is no code for this button!");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu)
        return new Error("Error! There is no code for this select menu!");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Error! There is no code for this modal!");

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);  
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction, client);
      } catch (err) {
        console.log(error);
      }
    }
  },
};
