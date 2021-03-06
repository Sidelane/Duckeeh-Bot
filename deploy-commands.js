// Imports
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, serverId, appId } = require('./config.json');

// Constants
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Load all Commands from Files in /commands/
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Send the loaded Commands to the Discord API
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(appId, serverId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);