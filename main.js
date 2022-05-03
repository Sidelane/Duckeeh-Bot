// Package Imports
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');

// Constants and local Imports
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { token } = require('./config.json');

// Creating the Client object
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Loading Commands from all the files in /commands/
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Loading Events from all the files in /events/
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Start the Client
client.login(token);