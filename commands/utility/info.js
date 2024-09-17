const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('information à propos du bot'),
	async execute(interaction) {
		await interaction.reply({ content: `Le bot a était créer par Mordween, des mise à jours seront réalisé dans le thème de wakfu\n
                                            Si vous rencontrez des bug, n'hésitez pas à envoyer le bug en mp à **mordween** sur discord`, 
                                            ephemeral: false });
	},
};