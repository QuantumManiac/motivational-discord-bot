module.exports = {
    name: 'ping',
    category: 'general',
    description: 'Ping!',
    args: false,
    guildOnly: false,
    execute(message, args) {
        message.channel.send('Pong');
    },
};
