const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { permRoles, ticketCategories } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Open a Ticket to verify your Valorant Rank!'),
	async execute(interaction) {
		let channelName = interaction.user.username;

		let chan = await interaction.guild.channels.create(channelName, {
			type: "GUILD_TEXT",
			parent: ticketCategories['verify'],
			permissionOverwrites: [
				{
					id: interaction.guild.roles.everyone,
					deny: ["VIEW_CHANNEL"]
				},
				{
					id: interaction.user.id,
					allow: ["VIEW_CHANNEL"]
				},
				{
					id: permRoles["owner"],
					allow: ["VIEW_CHANNEL"]
				},
				{
					id: permRoles["admin"],
					allow: ["VIEW_CHANNEL"]
				},
				{
					id: permRoles["moderator"],
					allow: ["VIEW_CHANNEL"]
				}
			]
		})

		const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId(`${chan.id}-verify`)
						.setLabel('Close Ticket')
						.setStyle('DANGER'),
				);


		await chan.send({ content: "Click the Button to Close this Ticket", components: [row] });

		await interaction.reply({ content: `Ticket opened: <#${chan.id}>`, ephemeral: true });
	},
};