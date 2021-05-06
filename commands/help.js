const { prefix } = require('../config.json')

module.exports = {
	name: 'help',
	description: 'List all commands or info about a specific command.',
	usage: '[command name]',
	execute(message, args) {
        const { commands } = message.client
        const data = []

        if (!args.length) {
            data.push('\nCommands:')
            data.push(commands.map(command => command.name).join(', '))
            data.push(`\n type \`${prefix}help [command name]\` to get info on a specific command`)
        } else {
            const name = args[0].toLowerCase()
            const command = commands.get(name)

            if (!command) {
                return message.reply('Invalid command')
            }

            data.push(`\n**Name:** ${command.name}`)
            if (command.description) data.push(`**Description:** ${command.description}`)
            if (command.usage) data.push(`**Usage:** ${command.usage}`)
        }

        return message.reply(data, {split: true})
	},
};