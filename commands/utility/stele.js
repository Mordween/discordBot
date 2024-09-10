const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Attachment } = require('discord.js');

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

        // const file = new AttachmentBuilder('../picture/stele1.jpg');
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`${sublimation.name}`)
          .setDescription(`La sublimation est obtenable dans le dj : ${donjon.name}`)
          // .setImage('attachment://stele1.jpg')

          .addFields({ name: 'Stele 1', value: `${donjon.stele1}`, inline: false })
          .addFields({ name: 'Stele 2', value: `${donjon.stele2}`, inline: false })
          .addFields({ name: 'Stele 3', value: `${donjon.stele3}`, inline: false })

          // .setImage('https://i.imgur.com/AfFp7pu.png')
          .setTimestamp()
        if (sublimation) {
            // await interaction.reply({ content: `Le donjon associé à **${sublimation.name}** est **${sublimation.donjon}**.`, ephemeral: false });
            // await interaction.followUp({ content: `Les stèles associé à **${donjon.name}** sont :`, ephemeral: false }); 
            // await interaction.followUp({ content: `**${donjon.stele1}**`, ephemeral: false });
            // await interaction.followUp({ content: `**${donjon.stele2}**`, ephemeral: false });
            // await interaction.followUp({ content: `**${donjon.stele3}**`, ephemeral: false });
            await interaction.reply({ embeds: [exampleEmbed] })
            if(donjon.name=="Donjon Mansots")
            {
              new Promise(resolve => setTimeout(resolve, 10000000))
              const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`${sublimation.name}`)
                .setDescription(`La sublimation est obtenable dans le dj : ${donjon.name}`)
                // .setImage('attachment://stele1.jpg')

                .addFields({ name: 'Stele 1', value: `${donjon.stele1T}`, inline: false })
                .addFields({ name: 'Stele 2', value: `${donjon.stele2T}`, inline: false })
                .addFields({ name: 'Stele 3', value: `${donjon.stele3T}`, inline: false })

                // .setImage('https://i.imgur.com/AfFp7pu.png')
                .setTimestamp()
                setTimeout(function(){ 
                  interaction.followUp({ content: 'Je rigole, tiens tes stèles', ephemeral: false });
                  interaction.followUp({ embeds: [exampleEmbed] })
              }, 10000);
              
            }
        } else {
            await interaction.reply({ content: 'Sublimation non trouvée.', ephemeral: true });
        }
	},
};