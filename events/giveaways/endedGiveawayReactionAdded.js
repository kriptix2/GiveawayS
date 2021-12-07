const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
    reaction.users.remove(member.user);
     member.send({
      embeds: [new Discord.MessageEmbed()
        .setTitle(`Giveaway ended already!`)
        .setColor("#2F3136")
        .setDescription(`Hey ${member.user}\n The giveaway you reacted has already ended :sob:\n Be quick next time!`)
        .setTimestamp()
        .setFooter(member.user.username, member.user.displayAvatarURL())
      ]
    });
  }
}
