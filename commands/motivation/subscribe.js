const { Subscribers } = require('../../helpers/dbObjects');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'subscribe',
    category: 'motivation',
    description: 'Subscribes you to the motivational bot',
    aliases: ['sub'],
    args: false,
    guildOnly: true, // TODO: Add subscription for DMs
    async execute(message, args) {

        try {
            await Subscribers.create({
                user_id: message.author.id,
                username: message.author.username,
                server_id: message.guild.id,
            });

            return message.reply('Subscribed.');
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return message.reply(`You're already subscribed. Unsubscribe with \`${prefix}unsubscribe\``);
            }

            console.error(err);
            return message.reply('Something went wrong when attempting to subscribe');
        }
    },
};
