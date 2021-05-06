const { Subscribers } = require('../../helpers/dbObjects');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'unsubscribe',
    category: 'motivation',
    description: 'Unsubscribes you from the motivational bot',
    aliases: ['unsub', 'lemmeout'],
    args: false,
    guildOnly: true, // TODO: Add subscription for DMs
    async execute(message, args) {

        try {
            const deletedCount = await Subscribers
                .destroy({ where: {user_id: message.author.id}});

            if (!deletedCount) throw 'ItemNotFoundError';

            return message.reply('Unsubscribed');
        } catch (err) {

            if (err === 'ItemNotFoundError') {
                return message.reply(`You are not currently subscribed. \`Subscribe with ${prefix}subscribe\``);
            }

            console.error(err);
            return message.reply('Something went wrong when attempting to unsubscribe');
        }
    },
};
