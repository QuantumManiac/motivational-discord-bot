// TODO passing user (containing activity) and activity are redundant

function statusMotivation1(user, activity) {
    let statusWordArray = activity.state.split(' ');
    return `I like your status, especially the word "${statusWordArray[Math.floor(Math.random() * statusWordArray.length)]}"`;
}

function spotifyMotivation1(user, activity) {
    return `Wow, "${activity.details}" is my favorite song by "${activity.state}!"`;
}

function genericMotivation1(user) {
    return 'Remember to stay hydrated! :)';
}

function gameMotivation1(user, activity) {
    return `Best of luck with doing ${activity?.state} on ${activity.name}!`;
}


module.exports = {
    status: [
        statusMotivation1,
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
