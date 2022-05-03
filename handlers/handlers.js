const { permRoles, ticketCategories } = require('../config.json');

async function archiveChannel(channel, newName, everyone) {

    (await channel).lockPermissions();
    (await channel).edit({
        name: newName,
        parent: ticketCategories['archive'],
        permissionOverwrites: [
            {
                id: everyone,
                deny: ["VIEW_CHANNEL"]
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
    });
}

async function handleButtons(interaction) {

    let chanId = interaction.customId.split("-")[0];
    let text = interaction.customId.split("-")[1];
    let chan = interaction.guild.channels.fetch(chanId);
    let oldName = (await chan).name;
    
    await archiveChannel(chan, `${oldName}-${text}`, interaction.guild.roles.everyone);

    await interaction.reply("Ticket archived!");
}

module.exports = { handleButtons };