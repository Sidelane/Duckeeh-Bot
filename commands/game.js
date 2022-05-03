const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDescription('Submit a Video for the Guess The Rank Game!')
		.addStringOption(option => option.setName('rank').setDescription('The Rank of the User in the Video'))
		.addStringOption(option => option.setName('video').setDescription('The Link to the Video')),
	async execute(interaction) {
		let rank = interaction.options.getString("rank");
		let link = interaction.options.getString("video");

		if (!rank || !link) 
			return await interaction.reply({ content: "Missing Parameters", ephemeral: true })

		// write vid to db
		// post it in a channel
		// add role reaction to the post
		// add reaction to end it
		// if it ends -> reply to it with the result
		console.log(rank, link);

        await interaction.reply({ content: "yes", ephemeral: true })
	},
};