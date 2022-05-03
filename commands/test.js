const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Submit a Video for the Guess The Rank Game!')
		.addStringOption(option => option.setName('rank').setDescription('The Rank of the User in the Video'))
		.addBooleanOption(option => option.setName("test").setDescription("description")),
	async execute(interaction) {
		console.log(interaction);
        await interaction.reply({ content: "yes", ephemeral: true })
	},
};