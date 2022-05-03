const handlers = require("../interactions/handlers");

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		if (interaction.isButton()) {
            await handlers.handleButtons(interaction);
        }
    
        if (!interaction.isCommand()) return;
	},
};