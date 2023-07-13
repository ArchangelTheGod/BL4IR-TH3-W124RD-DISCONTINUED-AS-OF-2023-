const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const shopinventorySchema = require('../../Models/Shop Inventory');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-items')
    .setDescription('Add items to the shop inventory!')
   .addStringOption(option => option
      .setName('item-name')
      .setDescription('The name of the item!')
      .setRequired(true))
    .addIntegerOption(option => option
       .setName('price')
       .setDescription('The price of the item!')
       .setRequired(true)
       .setMinValue(100)
       .setMaxValue(9999999999))
              //9,999,999,999 Billion $
    .addIntegerOption(option => option
        .setName("item-id")
        .setDescription("The unique item signature")
        .setMinValue(100000)
        .setMaxValue(9999999999)
        .setRequired(true))
    .addStringOption(option => option
        .setName("isconsumable")
        .setDescription("Is the item a consumable? (True/False)")
        .setRequired(true))
    .addStringOption(option => option
        .setName("ispurchasableonce")
        .setDescription("Is the item only available once? (True/False)")
        .setRequired(true))
    .addIntegerOption(option => option
        .setName("haspurchaselimit")
        .setDescription("What is the purchase limit? (Integer)")
        .setRequired(true)),
     
     async execute(interaction) {
        if (interaction.user.id != "782357589723578409") return await
        interaction.reply({
            content: "Only the Devs can use this command!",
            ephemeral: true
        });
        else{
            
            const itemName = interaction.options.getString("item-name");
            const itemPrice = interaction.options.getInteger("price");
            const inputitemID = interaction.options.getInteger("item-id");
            const itemIsConsumable = interaction.options.getString("isconsumable");
            const itemIsPurchasableOnce = interaction.options.getString("ispurchasableonce");
            const itemHasPurchaseLimit = interaction.options.getInteger("haspurchaselimit");

            let Data = await shopinventorySchema.findOne({
                ItemID: " ",
                Item: " "
            })

            if(Data) return await interaction.reply({

                content: "This item already exists"
            })


            Data = new shopinventorySchema({
                User: interaction.user.id,
                Item: itemName,
                ItemID: inputitemID,
                ItemPrice: itemPrice,
                IsConsumable: itemIsConsumable,
                IsPurchasableOnce: itemIsPurchasableOnce,
                HasPurchaseLimit: itemHasPurchaseLimit
            })

            await Data.save();

            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription("**Item Creation**")
                    .addFields({ name: "Item:", value: `\`\`${itemName}\`\``})
                    .addFields({ name: "Price:", value: `\`\`${itemPrice}\`\``})
                    .addFields({ name: "Item ID:", value: `\`\`${inputitemID}\`\`\n`})
                    .addFields({ name: "Tags:", value: `__isConsumable?__ \`\`${itemIsConsumable}\`\`\n __isPurchasableOnce?__ \`\`${itemIsPurchasableOnce}\`\`\n __hasPurchaseLimit?__ \`\`${itemHasPurchaseLimit}\`\``})],
                    ephemeral: true
            })
        }
    }
}