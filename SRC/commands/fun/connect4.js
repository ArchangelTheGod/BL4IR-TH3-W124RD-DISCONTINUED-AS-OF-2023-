//Dependencies
const { SlashCommandBuilder } = require('discord.js');
const { Connect4 } = require('discord-gamecord');
const blacklist = require("../../Models/Blacklist");

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName("connect4")
    .setDescription("Play a game of Connect 4")
    .addUserOption(option => option
      .setName('user')
      .setDescription('The user you want to 1v1')
      .setRequired(true)),
    async execute(interaction) {
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
        //Gamecord API
        const Game = new Connect4({
          message: interaction,
          isSlashGame: true,
          opponent: interaction.options.getUser('user'),
          embed: {
            title: 'Connect4 Game',
            statusTitle: 'Status',
            color: '#5865F2'
          },
          emojis: {
            board: '⚪',
            player1: '🔴',
            player2: '🟡'
          },
          mentionUser: true,
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          turnMessage: '{emoji} | Its turn of player **{player}**.',
          winMessage: '{emoji} | **{player}** won the Connect4 Game.',
          tieMessage: 'The Game tied! No one won the Game!',
          timeoutMessage: 'The Game went unfinished! No one won the Game!',
          playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });
        
        Game.startGame();
        interaction.setCooldown(10000)
        }
    }

}