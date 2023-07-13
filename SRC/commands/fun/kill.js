const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const deathSchema = require('../../Models/Deaths');

var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Kill a user!')
    .addUserOption(option => option
        .setName('user')
        .setDescription("The user you wanna kill")
        .setRequired(true))
    .addStringOption(options => options
        .setName("message")
        .setDescription("The message you'd like to tell the victim")
        .setRequired(false)),
     
     async execute(interaction) {

        if (timeout.includes(interaction.user.id))
        return await interaction.reply({
            embeds: [new EmbedBuilder()
            .setDescription("Slow down, bud. Try again in 1 minute.")],
            ephemeral: true
        });
        let Data = await deathSchema.findOne({
            User: interaction.user.id,
            UserName: interaction.user.tag,
        })
        

        const target = interaction.options.getUser("user")
        const msg = interaction.options.getString("message")
        const killer = interaction.user

        if (target === killer) {
            const addDeaths = await deathSchema.findOne({
                User: interaction.user.id,
                UserName: interaction.user.username
                
            })
            addDeaths.Deaths += 1;
            await addDeaths.save()
        }

        const deathmsg = ["Was impaled by:", "Was pushed into lava by:", "Was struck by lightning by:", 
                        "Died of cringe from:", "Was stabbed by:", "Was eaten by", "Was squashed by:", "Was beaten to death by:", "Was shot by:", "Was poisoned by:", 
                        "Was blown up by:", "Was incinerated by:", "Drowned trying to escape:", "Burned trying to escape:", "Was impaled with a dildo from:",
                        "Ate too many magic mushrooms, joined the Russian Mafia, and died.", "Was obliterated by a sonically charged shriek from", "Was obliterated by:", 
                        "Was castrated by:", "Lost their testicles to:", "Lost their virginity to:", "Was violated by the horse;", "Choked on a condom from:", 
                        "Disobeyed Hitler and was executed by:", "Poked the bear;", "Got played by:"]
        const deathmsgrand  = Math.floor(Math.random() * deathmsg.length)

        const deathembed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`**${target}'s Death**`)
        .addFields({ name: "Killer:", value: `${killer}`})
        .addFields({ name: "Victim:", value: `${target}`})
        .addFields({ name: "Cause of Death:", value: `**${deathmsg[deathmsgrand]}** ${killer}`})
        .addFields({ name: "Message to victim:", value: `\`\`${msg}\`\``})
        .setTimestamp()
        .setFooter({ text: "Death!" })

        await interaction.reply({
            content: `||${target}||`,
            embeds: [deathembed]
        });

        await interaction.followUp({
            embeds: [new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Killed: ${target}!`)],
            ephemeral: true
        })

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 10000)
    }
}