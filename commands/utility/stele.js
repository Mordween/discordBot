const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Attachment } = require('discord.js');

const fs = require('fs');

function findWord(word, str) {
  return str.split(" ").some(function(w){return w === word})
}
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
		.setDescription('Obtenir les différentes stèles')
		.addStringOption(option =>
			option.setName('sublimation')
				.setDescription('Par sublimation')
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();

        const sublimations = loadSublimations();
        const filtered = sublimations.filter(sub => sub.name.toLowerCase().startsWith(focusedValue.toLowerCase()));
        
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
	async execute(interaction) 
  {
		const sublimationName = interaction.options.getString('sublimation');
    // Trouver la sublimation dans le fichier JSON
    const sublimation = findSublimation(sublimationName);
    const donjon = findDonjon(sublimation.donjon);
      
    if (sublimation) {
      if(findWord("Brèche", sublimation.donjon))
      {
        let exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`${sublimation.name}`)
          .setDescription(`La sublimation est obtenable dans la brèche : ${sublimation.donjon}`)
          .setTimestamp()
        await interaction.reply({ embeds: [exampleEmbed] })
      }
      else if(findWord("Mimic", sublimation.donjon))
      {
        let exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`${sublimation.name}`)
          .setDescription(`La sublimation est obtenable dans un ${sublimation.donjon}`)
          .setTimestamp()
        await interaction.reply({ embeds: [exampleEmbed] })
      }
      else
      {
        let exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(`${sublimation.name}`)
          .setDescription(`La sublimation est obtenable dans le dj : ${donjon.name}`)
          .addFields({ name: 'Stele 1', value: `${donjon.stele1}`, inline: false })
          .addFields({ name: 'Stele 2', value: `${donjon.stele2}`, inline: false })
          .addFields({ name: 'Stele 3', value: `${donjon.stele3}`, inline: false })
          .setTimestamp()
        await interaction.reply({ embeds: [exampleEmbed] })
        if(donjon.name=="Donjon Mansots")
        {
          let exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${sublimation.name}`)
            .setDescription(`La sublimation est obtenable dans le dj : ${donjon.name}`)
            .addFields({ name: 'Stele 1', value: `${donjon.stele1T}`, inline: false })
            .addFields({ name: 'Stele 2', value: `${donjon.stele2T}`, inline: false })
            .addFields({ name: 'Stele 3', value: `${donjon.stele3T}`, inline: false })
            .setTimestamp()

            setTimeout(function(){ 
              interaction.followUp({ content: 'Je rigole, tiens tes stèles', ephemeral: false });
              interaction.followUp({ embeds: [exampleEmbed] })
          }, 10000);  // attente de 10 sec
          
        }
      }
    } 
    else 
    {
      await interaction.reply({ content: 'Sublimation non trouvée.', ephemeral: true });
    }
	},
};

