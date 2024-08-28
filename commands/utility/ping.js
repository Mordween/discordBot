const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({ content: `Secret Pong!`, ephemeral: true });
		// await interaction.deferReply({ephemeral: true});
		// await wait(4_000);  // not defined
		// await interaction.editReply({ content: `Secret Pong!`, ephemeral: true });
	},
};