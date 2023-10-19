const { Minesweeper } = require('discord-gamecord');
const { SlashCommandBuilder } =  require('discord.js');
const blacklist = require("../../Models/Blacklist");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('minesweeper')
    .setDescription('Play a game of minesweeper!'),
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
            const Game = new Minesweeper({
                message: interaction,
                isSlashGame: true,
                embed: {
                    title: 'Minesweeper',
                    color: '#5865F2',
                    description: 'Click on the buttons to reveal the blocks except mines.'
                },
                emojis: { flag: '🚩', mine: '💣' },
                mines: 5,
                timeoutTime: 60000,
                 winMessage: 'You won the Game! You successfully avoided all the mines.',
                loseMessage: 'You lost the Game! Beaware of the mines next time.',
                 playerOnlyMessage: 'Only {player} can use these buttons.'
                 });
            
                    Game.startGame();
                    interaction.setCooldown(10000)
        }
    }
}