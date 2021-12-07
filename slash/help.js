const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 View all the commands available to the bot!',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#2F3136')
        .setDescription('**Please Select a category to view all its commands**\n Currently 12 commands are registered to the bot!')
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.username} | GiveawaysforLife`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categories » Giveaway")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the giveaway commands:```")
          .addFields(
            { name: 'Create'  , value: `Start a giveaway in your server!\n > **How?: \`/create\`**`, inline: true },
            { name: 'Edit' , value: `Edit an already running giveaway!\n > **How?: \`/edit\`**`, inline: true },
            { name: 'End' , value: `End an already running giveaway!\n > **How?: \`/end\`**`, inline: true },
            { name: 'List' , value: `List all the giveaways running within this server!\n > **How?: \`/list\`**`, inline: true },
            { name: 'Pause' , value: `Pause an already running giveaway!\n > **How?: \`/pause\`**`, inline: true },
            { name: 'Reroll' , value: `Reroll an ended giveaway!\n > **How?: \`reroll\`message\`**`, inline: true },
            { name: 'Resume' , value: `Resume a paused giveaway!\n > **How?: \`resume\`**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | GiveawaySforLife`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categories » General")
          .setColor('#2F3136')
          .setDescription("```yaml\nHere are the general bot commands:```")
          .addFields(
            { name: 'Help'  , value: `Shows all available commands to this bot!\n > **How?: \`/help\`**`, inline: true },
            { name: 'Invite' , value: `Get the bot's invite link!\n > **How?: \`/invite\`**`, inline: true },
            { name: 'Ping' , value: `Check the bot's websocket latency!\n > **How?: \`/ping\`**`, inline: true },
            { name: 'Vote' , value: `Vote for the bot!\n > **How?: \`/vote\`**`, inline: true },
            { name: 'Status' , value: `Check the bot's status!\n > **How?: \`/status\`**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested by ${interaction.user.username} | GiveawaySforLife`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select a Category")
                .setDisabled(state)
                .addOptions([{
                        label: `Giveaways`,
                        value: `giveaway`,
                        description: `View all the giveaway based commands!`,
                        emoji: `🎉`
                    },
                    {
                        label: `General`,
                        value: `general`,
                        description: `View all the general bot commands!`,
                        emoji: `⚙`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    }
                });
                collector.on('end', () => {
                  initialMessage.update({ components: components(true) });
              }
              )
    },
};
