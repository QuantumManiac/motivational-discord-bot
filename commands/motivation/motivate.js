// const { Motivations } = require('../../helpers/dbObjects');
const customMotivationHandlers = require('../../helpers/customMotivationHandlers');

module.exports = {
    name: 'motivate',
    category: 'motivation',
    description: 'Sends a motivation to either you or the selected user',
    usage: '[username_mention]',
    args: false,
    guildOnly: true, // TODO: Add subscription for DMs
    execute(message, args) {
        if (!args.length) {
            return message.reply(getMotivation(message.author));
        }

        let targetUserMention = args[0];
        let targetUserId = getUserFromMention(targetUserMention);
        console.log(targetUserId);

        if (!targetUserId || !message.channel.members.has(targetUserId)) {
            return message.reply('User to motivate does not exist in this channel');
        }

        message.channel.send(`${targetUserMention} \n ${getMotivation(message.channel.members.get(targetUserId).user)}`);
    },
};

// TODO weightings for each activity. Games are high, Spotify and Custom status low
function getMotivation(user) {
    let activities = { games: [] };
    user.presence.activities.forEach(activity => {
        if (activity.name === 'Spotify') {
            activities.spotify = activity;
        } else if (activity.name === 'Custom Status') {
            activities.status = activity;
        } else {
            activities.games.push(activity);
        }
    });

    if (activities.games.length) {
        return motivateForCategory('game', user);
    }

    if (activities.spotify) {
        return motivateForCategory('spotify', user, activities.spotify);
    }

    if (activities.status?.state) {
        return motivateForCategory('status', user, activities.status);
    }

    return motivateForCategory('generic', user);
}

function getUserFromMention(mention) {
    if (mention.startsWith('<@!') && mention.endsWith('>')) {
        return mention.slice(3, -1);
    }
    return null;
}

function motivateForCategory(category, user, activity) {
    return customMotivationHandlers[category][Math.floor(Math.random() * customMotivationHandlers.status.length)](user, activity);
}

