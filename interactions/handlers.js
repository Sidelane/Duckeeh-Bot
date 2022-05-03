const config = require('../config.json');

async function handleButtons(interaction) {
    let chanId = interaction.customId.split("-")[0];
    let text = interaction.customId.split("-")[1];

    let chan = interaction.guild.channels.fetch(chanId);
    (await chan).edit({ parent: config['ticket-categories']['archive'] });
    (await chan).lockPermissions();

    let oldName = (await chan).name;

    (await chan).edit({
        name: `${oldName}-${text}`,
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
            }
        ]
    } );

    await interaction.reply("Ticket archived!");
}

module.exports = { handleButtons };