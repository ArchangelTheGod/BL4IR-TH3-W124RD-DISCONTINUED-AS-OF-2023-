const {
    SlashCommandBuilder,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");
const blacklist = require("../../Models/Blacklist");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName(`quote`)
      .setDescription(`Quotes whatever you want!`),
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
          const modal = new ModalBuilder()
          .setCustomId(`quote`)
          .setTitle(`Your Quote!`);
    
        const textInput = new TextInputBuilder()
          .setCustomId(`quoteInput`)
          .setLabel(`What do you want BL4IR to quote?`)
          .setRequired(true)
          .setStyle(TextInputStyle.Short);
    
        modal.addComponents(new ActionRowBuilder().addComponents(textInput));
    
        await interaction.showModal(modal);
        interaction.setCooldown(5000)
        }
    },
  };
  