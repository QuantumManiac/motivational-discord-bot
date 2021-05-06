const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    category: 'general',
    description: 'List all commands or info about a specific command.',
    usage: '[command name]',
    execute(message, args) {
        const { commands } = message.client;
        let data = [];

        if (!args.length) {

            let categorizedCommands = {};

            commands.forEach(command => {
                if (!command.category) {
                    command.category = 'uncategorized';
                }

                if (!categorizedCommands[command.category]) {
                    categorizedCommands[command.category] = [command];
                } else {
                    categorizedCommands[command.category].push(command);
                }
            });

            console.log(categorizedCommands);

            data.push('\n**Commands:**');
            for (const [key, value] of Object.entries(categorizedCommands)) {
                data.push(`${key}: \`${value.map(command => command.name).join(', ')}\``);
            }
            data.push(`\n type \`${prefix}help [command name]\` to get info on a specific command`);
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) ||
                commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

            if (!command) {
                return message.reply('Invalid command');
            }

            data.push(`\n**Name:** \`${command.name}\``);
            if (command.category) data.push(`**Category:** ${command.category}`);
            if (command.aliases) data.push(`**Aliases:** \`${command.aliases.join(', ')}\``);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${command.usage}`);
        }

        return message.reply(data, {split: true});
    },
};
