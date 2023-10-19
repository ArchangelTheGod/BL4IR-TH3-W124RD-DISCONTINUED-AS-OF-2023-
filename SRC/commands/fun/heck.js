//Dependencies
const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const blacklist = require("../../Models/Blacklist");
const wait = require("node:timers/promises").setTimeout

//Exports
module.exports = {
    data: new SlashCommandBuilder()
    .setName('hack')
    .setDescription('Hack a user and obtain their details.')
    .addUserOption(option => option
       .setName('target')
       .setDescription('The target to hack.')),
     
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
			//Button
		const row1 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setLabel("View Published Data Leak")
			.setStyle(ButtonStyle.Link)
			.setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs")
		)

		//Fetch Options
        const victim = interaction.options.getMember("target")

	try {
		//Message Updater
		await interaction.reply({
			content: `\`\`Hacking ${victim.displayName}....\`\``,
		})

		await wait(5000)

		await interaction.editReply({
			content: `\`\`Finding ${victim.displayName}'s Email and Password.....\`\``,
		})

		await wait(5000)
		
		await interaction.editReply({
			content: `\`\`E-Mail: ${victim.displayName}@gmail.com \nPassword: ###########\`\``,
		})

		await wait(3000)

		await interaction.editReply({
			content: "``Finding Other Accounts.....``",
		})

		await wait(6000)

		await interaction.editReply({
			content: "``Found [1] Minecraft, Microsoft, Apple, Samsung accounts....``.",
		})

        await wait(6000)

        await interaction.editReply({
			content: "``Found [10] Other accounts [50+ more ->].....``",
		})

		await wait(6000)

		await interaction.editReply({
			content: "``Collecting password hashes......``",
		})

		await wait(7000)

		await interaction.editReply({
			content: "``Un-hashing and Un-salting passwords......``",
		})

		await wait(10000)

		await interaction.editReply({
			content: "``Compiling data leak.....``",
		})

		await wait(7000)

		await interaction.editReply({
			content: "``Exiltrating to home server [IP:*******************]....``",
		})

		await wait(10000)

        await interaction.editReply({
			content: "``Exfiltrated!``",
		})

        await wait(5000)

        await interaction.editReply({
			content: "``Publishing and selling data to Forums.....``",
		})
        
        await wait(6000)

        await interaction.editReply({
            content: "``Cleaning up....``"
        })

        await wait(5000)

        await interaction.editReply({
            content: "``Planting Trojan virus shortcut in-place for discord.exe``....``"
        })

        await wait(3000)

        await interaction.editReply({
            content: "``Encrypting Files...``"
        })

        await wait(4000)

        await interaction.editReply({
            content: "``Prompting Restart``..."
        })

        await wait(3000)

        await interaction.editReply({
            content: "``Finishing up...``"
        })

		await wait(4000)

		await interaction.editReply({
			content: "``Self destructing.....``",
		})

        await wait(4000)

        await interaction.editReply({
            content: "``Disconnecting and restarting victim's PC...``"
        })

        await wait(3000)

        await interaction.editReply({
            content: "Completed! ✅"
        })

        await wait(5000)

		await interaction.editReply({
			content: `Finished hacking ${victim.displayName}`,
			components: [row1]
		})
	} catch (err) {}
	interaction.setCooldown(10000)
        }
    }
}