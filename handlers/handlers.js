const fs = require('fs');
const { basePath, appId, permRoles, ticketCategories } = require('../config.json');


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

async function collectMessages(channel) {
    const messages = await (await channel).messages.fetch({ limit: 100 });
    const list = [];

    messages.forEach((msg) => {
        if (msg.content === "Click the Button to Close this Ticket") {
            msg.delete();
        }
        if (msg.author.id === appId) return
        list.push([msg.createdTimestamp, msg.author.username, msg.author.discriminator, msg.content]);
    });

    return list;
}

async function archiveToDatabase(messages, channel, type) {
    
    if (messages.length === 0) return

    let list = [];

    messages.forEach(msg => {
        list.push({
            timestamp: msg[0],
            username: `${msg[1]}#${msg[2]}`,
            content: msg[3]
        })
    });

    let data = JSON.stringify(list, null, 4);
    fs.writeFileSync(`${basePath}/logs/${(await channel).id}-${(await channel).name}-${type}.json`, data);
}

async function handleButtons(interaction) {

    let chanId = interaction.customId.split("-")[0];
    let text = interaction.customId.split("-")[1];
    let chan = interaction.guild.channels.fetch(chanId);
    let oldName = (await chan).name;
    
    const messages = await collectMessages(chan); // collects messages + deletes message with archive button
    await archiveToDatabase(messages, chan, text);
    await archiveChannel(chan, `${oldName}-${text}`, interaction.guild.roles.everyone);

}

module.exports = { handleButtons };