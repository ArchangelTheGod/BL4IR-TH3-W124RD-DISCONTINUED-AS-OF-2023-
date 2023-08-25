const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const deathlog = require('../../Models/KillLog');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Kills someone!')
    .addUserOption(option => option
       .setName('victim')
       .setDescription('The person you\'d like to kill')),
     
     async execute(interaction) {

        const target = interaction.options.getMember("victim")
        const perp = interaction.member
    
        let kills = [
            //Perp kills target
            `${perp} accessed ${target}'s task manager and killed process ${target}.exe!`,
            `${perp} blew their ear drums out listening to music too hard.`,
            `${perp} challenges ${target} to a fist fight to the death. ${target} wins.`,
            `${perp} drowned ${target} in canola oil`,
            `${perp} called the S.W.A.T on ${target}, killing them in the process of a raid.`,
            `${perp} hired a hitman to eliminate ${target}. They fail.`,
            `${perp} spiked ${target}'s drink with lethal doses of cyanide, killing them.`,
            `${perp} left many explosive charges at ${target}'s door. They all went off as soon as ${perp} placed the last one, killing both.`,
            `${perp} was obliterated by a sonically charged shriek from ${target}.`,
            `${perp} pushed ${target} off of a cliff. ${target} survived.`,
            `${perp} absolutely FINESSED ${target} with their *"Infinity IQ"* dance moves.`,
            `${perp} bent space, time, and reality, and forced the amalgamation of terror towards ${target}.`,
            //Perp Karma
            `${perp} ate too many magic mushrooms, joined the Russian Mafia, and died. *"(EvancommitsMeme)"*`,
            `${perp} was absolutely INCAPACITATED by ArchangelTheGod.`,
            `${perp} ascended to a cosmic being, sought after ALL 6 of the Infinity Stones, and snapped ${target} out of existence throughout all of space and time.`,
            `${perp} gained speedster powers in the future, traveled back in time, killed ${target}'s mother, and died 15 years later after their distant ancestor shot himself in an attempt to save ${target}'s life..`,
            `${perp} created an alternate timeline, attempted to travel back to the previous timeline, lost their partner to an evil-twisted version of themselves from the future, and made their time remnant suffer so that they would become their evil-variant in the past.`,
            `${perp} fell into the backrooms.`,
            `${perp}'s dumbass was submerged in lava`,
            `${perp} fell victim to ${target}'s crypto scheme, losing all their money, and killing themselves afterwards.`,
            `${perp} overdosed on cocaine.`,
            //Target Kills Perp
            `${target} was practicing shooting a bow. ${perp} got in the way, and was shot in the head.`,
            `${perp} publicly shamed ${target}, causing the crowd to beat ${perp} to death.`,
            `${target} summoned the Ender Dragon on ${perp} and was flung into the stratosphere.`,
            `${target} tinkered away in a lab, creating the most deadly virus far worse than COVID-19 or Influenza. ${perp} became the patient-zero for the virus, and was immediately ordered to be killed.`,
            `${target} was blessed with admin powers from ArchangelTheGod, and used them to absolutely obliterate ${perp} in retaliation.`,
            `${perp} contradicted ${target}'s opinions, causing ${target} to summon-forth their army of 4-Chan users to destroy ${perp}.`,
            `${target} sacrificed ${perp} to the almighty ArchangelTheGod.`,
            //Target Karma
            `${target} experienced kinetic energy.`,
            `${target} was killed by radiation poisoning.`,
            `${target} got trapped in Damian Dhark's Time Stone.`,
            `${target} was impaled in the chest by Reverse Flash.`,
            `${target}'s tank was shot by a depleted uraniam-<<Railgun>> shot from ${perp}.`,
            `${target}'s tank was shredded apart by ${perp}'s <<Mammoth>> AT-Field. *"(DreadKnought)"*`,
            `${target}'s tank incinerated by ${perp}'s <<Wasp>> N2 Bomb. *"(DreadKnought)"*`,
            `${target} was absolutely FINESSED by Infinity Ultron throughout the entire multiverse.`,
            `${target} was mentally tortured by Spiderman. They were about to deny their cannon-event.`,
            `${target} got cancelled on X by Elon Musk.`,
            //Custom Deaths
            `${target} lost their virginity to ${perp}.`,
            `${perp} lost their virginity to ${target}.`,
            `${target} was eaten alive by ${perp}`,
            `${perp} was eaten alive by ${target}`,
            `${target} got fried by the Gamma-Rays emitted by using the Infinity Stones.`,
            `${perp} got fried by the Gamma-Rays emitted by using the Infinity Stones.`,
            `${target} overdosed on Velocity-9- as they ran, their physical body disintigrated into Speedforce energy.`,
            `${perp} overdosed on Velocity-9- as they ran, their physical body disintigrated into Speedforce energy.`,
            `${target} got ROASTED by Eminem on FOX NEWS.`,
            `${perp} got ROASTED by Eminem on FOX NEWS.`,
            `${target} was executed via- Guillotine`,
            `${perp} was executed via- Guillotine`,
            `${target} was executed via- Electric Chair`,
            `${perp} was executed via- Electric Chair`,
            `${target} was executed via- Lethal Injection`,
            `${perp} was executed via- Lethal Injection`,
            `${target} was executed via- Firing Squad`,
            `${perp} was executed via- Firing Squad`,
            //Funny Deaths
            `${target} tried to race in-front of a train driven by ${perp}. The train won.`,
            `${target} stopped then JFK assasination, and was erased from existence.`,
            `${perp} was crushed alive by a Garbage Truck's compacter.`,
            `${perp} got their pp chopped off by a food processor`,
            `${perp} and ${target} both failed to touch grass.`

        ]
        
        if (perp === target) {
            const addDeaths = await deathlog.findOne({
                User: interaction.user.id,
                UserName: interaction.user.username
                
            });
            if (!addDeaths) {
                await interaction.reply({
                    content: "You died, however, your death wasn't counted towards your death counter."
                })
            }else{
                addDeaths.Deaths += 1;
                await addDeaths.save()
                await interaction.reply({
                    content: "You killed yourself."
                })
            }
        }
        else{
            if (target.id === "782357589723578409") {
                kills = `Sorry, ${perp}. Archangel is **Unkillable-** You were ill-advised thinking you could kill him.`
                    await interaction.reply({
                        content: kills
                })
            }
            else{
                const death = kills[Math.floor(Math.random() * kills.length)]
                await interaction.reply({
                    content: death
                })
                const addkills = await deathlog.findOne({
                    User: interaction.user.id
                })
                if(!addkills) {
                    interaction.followUp({
                        content: "This kill wasn't counted towards your total kills.",
                        ephemeral: true
                    })
                }else{
                    addkills.PlayerKills += 1;
                    await addkills.save()
                }
            }
        }
    }
}