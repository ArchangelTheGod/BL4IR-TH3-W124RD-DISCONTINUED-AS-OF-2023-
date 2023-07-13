const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const pingstaff = require('../../Models/pingstaff');

// var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pings')
    .setDescription('Ping staff for support!')
    .addSubcommand(command => command
        .setName("staff-manage")
        .setDescription("Manage the ping-staff system.")
        .addRoleOption(option => option
            .setName("role")
            .setDescription("The role you want members to be able to mention.")
            .setRequired(true)))
    .addSubcommand(command => command
        .setName("help")
        .setDescription("Pings all online staff members")
        .addRoleOption(option => option
            .setName("role")
            .setDescription("The staff role you want to ping")
            .setRequired(true))),
     async execute (interaction) {
        const { options } = interaction;
        const sub = options.getSubcommand();

        switch (sub) {
            case "staff-manage":

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
            return await interaction.reply({
                content: "You don't have permission to use this command.",
                ephemeral: true
            });

            else {
                const role = options.getRole("role")

                pingstaff.create({
                    Guild: interaction.guild.id,
                    RoleID: role.id,
                    RoleName: role.name
                })

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`The ping-staff system has been setup with the role; ${role}.`)


                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            break;
            case "help":

            const input = options.getRole("role")
            const id = input.id;
            const data = await pingstaff.findOne({ RoleID: id });
            if (!data) return interaction.reply({
                content: "The staff-ping system hasn't been setup for that role yet."
            })
            else{
                // if (!timeout.includes(interaction.user.id))
                //     return await interaction.reply({
                //     embeds: [new EmbedBuilder()
                //         .setDescription("Slow down, bud. Try again in 1 minute.")],
                //         ephemeral: true
                // });

                const members = input.members.filter((member) => {
                    const status = member.presence?.status;
                    return [`Online`, `dnd`, `idle`].includes(status);
                })

                if (members.size === 0) {
                    await interaction.reply({
                        content: `There is no one online with ${input}. Try again later.`,
                        ephemeral: true
                    })
                }
                else{
                    const memberlist = members.map((member) => member.toString()).join('\n+ ')

                    const memberembed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription("Pinged the staff! They should be with you shortly.")

                    await interaction.reply({
                        embeds: [memberembed],
                        content: `\>\>\> **Staff Ping Role Alert!**\n\n + ${memberlist}\n\n`
                    });

                    // timeout.push(interaction.user.id);
                    // setTimeout(() => {
                    //     timeout.shift();
                    // }, 10000)
                }
            }
        }
    }
}