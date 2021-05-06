const fs = require('fs');

module.exports = {
    name: 'reload',
    description: 'Reloads all commands',
    args: false,
    guildOnly: false, // TODO: Add subscription for DMs
    execute(message, args) {

        const newCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        try {
            for (const file of newCommandFiles) {
                delete require.cache[require.resolve(`./${file}`)];
                const newCommand = require(`./${file}`);
                message.client.commands.set(newCommand.name, newCommand);
            }

            return message.reply('Reloaded all commands...');
        } catch (err) {
            console.error(err);
            message.reply('There was an error while reloading commands');
        }
    },
};
