const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guess')
		.setDescription('Submit a Video for the Guess The Rank Game!')
		.addStringOption(option => option.setName('rank').setDescription('The Rank of the User in the Video'))
		.addStringOption(option => option.setName('video').setDescription('Link of the Video')),
	async execute(interaction) {
		//pass
	},
};