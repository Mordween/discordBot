const { SlashCommandBuilder } = require('discord.js');

const fs = require('fs');

function loadSublimations() {
  const data = fs.readFileSync('./dataBase/sublimation.json', 'utf-8');
  return JSON.parse(data);
}

function loadDonjons() {
    const data = fs.readFileSync('./dataBase/donjon.json', 'utf-8');
    return JSON.parse(data);
  }

function findSublimation(name) {
  const sublimations = loadSublimations();
  return sublimations.find(sub => sub.name.toLowerCase() === name.toLowerCase());
}

function findDonjon(name) {
    const donjons = loadDonjons();
    return donjons.find(sub => sub.name.toLowerCase() === name.toLowerCase());
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stele')
		.setDescription('où c\'est')
		.addStringOption(option =>
			option.setName('sublimation')
				.setDescription('Phrase to search for')
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();

        // Charger les sublimations depuis le fichier JSON
        const sublimations = loadSublimations();

        // Filtrer les sublimations en fonction de l'entrée de l'utilisateur
        const filtered = sublimations.filter(sub => sub.name.toLowerCase().startsWith(focusedValue.toLowerCase()));
  
		// const choices = ['retour PA', 'cicatrisation', 'ravage', 'ravage secondaire', 'fermeté'];
		// const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        let autoComp;
        if (filtered.length > 10) {
            autoComp = filtered.slice(0, 10);
        } else {
            autoComp = filtered;
        }
		await interaction.respond(
			autoComp.map(sub => ({ name: sub.name, value: sub.name })),
		);
	},
	async execute(interaction) {
		const sublimationName = interaction.options.getString('sublimation');
        // Trouver la sublimation dans le fichier JSON
        const sublimation = findSublimation(sublimationName);
        const donjon = findDonjon(sublimation.donjon);

        if (sublimation) {
            await interaction.reply({ content: `Le donjon associé à **${sublimation.name}** est **${sublimation.donjon}**.`, ephemeral: false });
            await interaction.followUp({ content: `Les stèles associé à **${donjon.name}** sont **${donjon.stele1}** \n **${donjon.stele2}**.`, ephemeral: false });
        } else {
            await interaction.reply({ content: 'Sublimation non trouvée.', ephemeral: true });
        }
	},
};