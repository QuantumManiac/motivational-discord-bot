const { defaultMotivationPictureUrl } = require('../config.json');

function Motivation(message, category, id, author, imageUrl = defaultMotivationPictureUrl) {
    this.message = message;
    this.category = category;
    this.id = id;
    this.author = author;
    this.image = imageUrl;
}


// TODO passing user (containing activity) and activity are redundant

// Custom Status motivations
function statusMotivationComplimentWord(user, activity) {
    let statusWordArray = activity.state.split(' ');
    let motivationMessage = `I like your status, especially the word "${statusWordArray[Math.floor(Math.random() * statusWordArray.length)]}"`;
    return new Motivation(motivationMessage, 'status');
}

function statusMotivationComplimentEmoji(user, activity) {
    let statusEmoji = activity.emoji;

    if (statusEmoji?.name) {
        return `${statusEmoji.name} is a very fitting emoji for you!`;
    } else {
        const emojiArray = user.client.emojis.cache.array();
        console.log(emojiArray);
        const randomEmoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        let motivationMessage = `Ooh, maybe you should add an emoji to your status! Might I suggest <:${randomEmoji.name}:${randomEmoji.id}>?`;
        return new Motivation(motivationMessage, 'status');
    }
}

// Spotify motivations
function spotifyMotivation1(user, activity) {
    let motivationMessage = `Wow, "${activity.details}" is my favorite song by "${activity.state}!"`;
    return new Motivation(motivationMessage, 'spotify', '0', 'motivational-bot', activity.assets.largeImageURL());
}

// Generic motivations
function genericMotivation1(user) {
    let motivationMessage = 'Remember to stay hydrated! :)';
    return new Motivation(motivationMessage, 'generic');
}

// Game motivations
function gameMotivation1(user, activity) {
    let motivationMessage = `Best of luck with doing ${activity?.state} on ${activity.name}!`;
    return new Motivation(motivationMessage, 'game');
}


module.exports = {
    status: [
        statusMotivationComplimentWord,
        statusMotivationComplimentEmoji,
    ],
    spotify: [
        spotifyMotivation1,
    ],
    generic: [
        genericMotivation1,
    ],
    game: [
        gameMotivation1,
    ],
};
