module.exports = {
    name: 'args-info',
    category: 'general',
    description: 'Information about the arguments provided.',
    args: true,
    usage: '<any args>',
    guildOnly: false,
    execute(message, args) {
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};
