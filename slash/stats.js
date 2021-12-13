const os = require('os');
const { MessageEmbed } = require('discord.js');
const feroms = require('fero-ms');

module.exports = {
	name: 'stats',
	description: 'Sends bot physical statistics',
	run: async (client, interaction) => {
		let uptime = client.uptime;
		let shortUptime = feroms.ms(uptime);
		let model = os.cpus()[0].model;
		let cores = os.cpus().length;
		let platform = os.platform();
		let nodejs = process.version;
		let djs = require('discord.js').version;
		let botversion = require('../package.json').version;
		let server = client.guilds.cache.size;
		let user = client.users.cache.size;
		let channel = client.channels.cache.size;

		let statsembed = new MessageEmbed()
			.addFields(
				{
					name: 'I have been online for?',
					value: `\`\`\`${shortUptime}\`\`\``
				},
				{
					name: 'Guilds',
					value: `\`${server}\``,
					inline: true
				},
				{
					name: 'Users',
					value: `\`${user}\``,
					inline: true
				},
				{
					name: 'Channels',
					value: `\`${channel}\``,
					inline: true
				},
				{
					name: 'Bot Version',
					value: `\`v${botversion}\``,
					inline: true
				},
				{
					name: 'Arch',
					value: `\`${os.arch()}\``,
					inline: true
				},
				{
					name: 'Platform',
					value: `\`${platform}\``,
					inline: true
				},
				{
					name: 'Cores',
					value: `\`${cores}\``,
					inline: true
				},
				{
					name: 'Discord.js Version',
					value: `\`v${djs}\``,
					inline: true
				},
				{
					name: 'Node.js Version',
					value: `\`${nodejs}\``,
					inline: true
				},
				{
					name: 'Ram Usage',
					value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
						2
					)}MB/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
					inline: true
				},
				{
					name: 'CPU Model',
					value: `\`\`\`${model}\`\`\``
				}
			)
			.setTimestamp();
		await interaction.reply({ embeds: [statsembed] });
	}
};
