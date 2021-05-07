const Discord = require('discord.js');
const customMotivationHandlers = require('../../helpers/customMotivationHandlers');

module.exports = {
    name: 'motivate',
    category: 'motivation',
    description: 'Sends a motivation to either you or the selected user',
    usage: '[username_mention]',
    aliases: ['motivateme', 'motivation'],
    args: false,
    guildOnly: true, // TODO: Add subscription for DMs
    async execute(message, args) {
        let recipient = {};

        if (!args.length) {
            recipient = message.author;
        } else {

            let targetUserMention = args[0];
            let targetUserId = getUserFromMention(targetUserMention);

            if (!targetUserId || !message.channel.members.has(targetUserId)) {
                return message.reply('User to motivate does not exist in this channel');
            }

            recipient = message.channel.members.get(targetUserId).user;
        }


        let motivation = getMotivation(recipient);

        let footerText = `Category: ${motivation.category} ${motivation?.id ? `| ID: ${motivation.id}` : '' } ${motivation?.author ? `| Author: ${motivation.author}` : '' }`;

        const motivationEmbed = new Discord.MessageEmbed()
            .setColor('#42ABAE')
            .setTitle('A motivation for you!')
            .setDescription(motivation.message)
            .setFooter(footerText)
            .setThumbnail(motivation?.image);

        await message.channel.send(`${recipient} ⬇`);
        await message.channel.send(motivationEmbed);
    },
};

function getMotivation(user) {
    let activityWeights = {};
    let weightSum = 0;

    let activities = { games: [] };
    user.presence.activities.forEach(activity => {
        if (activity.name === 'Spotify') {
            activities.spotify = activity;
            activityWeights.spotify = 0.07;
            weightSum += 0.15;
        } else if (activity.name === 'Custom Status') {
            activities.status = activity;
            activityWeights.status = 0.05;
            weightSum += 0.1;
        } else {
            activities.games.push(activity);
            activityWeights.game = 0.5;
            weightSum += 0.5;
        }
    });

    for (const [key, value] of Object.entries(activityWeights)) {
        activityWeights[key] = (value / weightSum);
    }

    let randomCategory = weightedRandomChoice(activityWeights) ?? 'generic';

    return motivateForCategory(randomCategory, user, activities[randomCategory]);
}

function getUserFromMention(mention) {
    if (mention.startsWith('<@!') && mention.endsWith('>')) {
        return mention.slice(3, -1);
    }
    return null;
}

function weightedRandomChoice(weightings) {
    let sum = 0;

    for (let i in weightings) {
        sum += weightings[i];
        if (Math.random() <= sum) return i;
    }
}

function motivateForCategory(category, user, activity) {
    return customMotivationHandlers[category][Math.floor(Math.random() * customMotivationHandlers[category].length)](user, activity);
}

