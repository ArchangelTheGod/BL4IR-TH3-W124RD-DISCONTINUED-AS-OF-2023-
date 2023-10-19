const { Trivia } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Play a game of Trivia!'),
    async execute (interaction) {
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
          const Game = new Trivia({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Trivia',
              color: '#5865F2',
              description: 'You have 60 seconds to guess the answer.'
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            trueButtonStyle: 'SUCCESS',
            falseButtonStyle: 'DANGER',
            mode: 'multiple',  // multiple || single
            difficulty: 'medium',  // easy || medium || hard
            winMessage: 'You won! The correct answer is {answer}.',
            loseMessage: 'You lost! The correct answer is {answer}.',
            errMessage: 'Unable to fetch question data! Please try again.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          Game.startGame();
          interaction.setCooldown(10000)
        }
    }
}