require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const { prefix } = require('./config.json');

// Init Discord Client
const client = new Discord.Client();

// Get Commands from ./command directory
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

// Message handler
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log(`${message.author.username}: ${commandName}`, args);

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        return message.reply(`Invalid command. Type \`${prefix}help\` for a list of commands`);
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('This command cannot be executed inside DMs');
    }

    if (command.args && !args.length) {
        let reply = 'Please provide arguments for this command';

        if (command.usage) {
            reply += `\n Usage: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.reply(reply);
    }

    try {
        command.execute(message, args);
    } catch (err) {
        console.error(err);
        return message.reply('Error executing command.');
    }
});

// Random Motivation
// const motivateInterval = setInterval(() => {
//     console.log('test');
// }, 1000);
