const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'create',
  description: '🎉 Create a giveaway',

  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: 'CHANNEL',
      required: true
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: ':x: You need to have the manage messages permissions to start giveaways.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ':x: Please select a text channel!',
        ephemeral: true
      });
    }
    if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Please select a valid duration!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Please select a valid winner count! greater or equal to one.',
      })
    }
    
        interaction.deferReply({ ephemeral: true })


        // start giveaway
        await client.giveawaysManager.start(giveawayChannel, {
          // The giveaway duration
          duration: ms(giveawayDuration),
          // The giveaway prize
          prize: giveawayPrize,
          // The giveaway winner count
          winnerCount: parseInt(giveawayWinnerCount),

    
          messages,
        });
        interaction.editReply({
          content:
            `:white_check_mark: Giveaway started in ${giveawayChannel}! Hey there If you have invited the bot before 19 Dec 2020, kindly reinvite the bot using the new invite link in /invite. Please ignore if already done/invited the bot after the said date!`,
          ephemeral: true
        })

  }

};
