const register = require('../../utils/slashsync');
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });

  console.log(`[ / | Slash Command ] - ✅ Loaded all slash commands!, `)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`;
  console.log(`[Status] ${client.user.tag} is now online!\n[Invite Link] ${invite}\n[Bot Uptime Status] https://stats.uptimerobot.com/8gMWRsXP3N/789538269`);
  const activities = [`All Giveaways!`, `My Creator nya neko#2339`, `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users in ${client.guilds.cache.size} Servers `];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 20000);
};
