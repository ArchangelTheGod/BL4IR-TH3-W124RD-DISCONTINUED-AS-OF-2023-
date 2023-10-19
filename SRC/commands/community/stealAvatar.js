const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
  } = require("discord.js");
const blacklist = require("../../Models/Blacklist");
  
  module.exports = {
    data: new ContextMenuCommandBuilder()
      .setName(`getAvatar`)
      .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        //Blacklist
        let Data = await blacklist.findOne({
            UserID: interaction.user.id
        }).catch(err => { })

        if (Data) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("Red")
                .setTitle("Info | Error")
                .setDescription("You cannot use this command, you are blacklisted.")
                .setFooter({ text: "Error Type: User is Blacklisted."})]
        })
        else {
          await interaction.reply({
            content: `${interaction.targetUser.displayAvatarURL()}`,
          });
          interaction.setCooldown(3000)
        }
    },
  };