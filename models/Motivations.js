const { defaultMotivationPictureUrl } = require('../config.json');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('motivations', {
        motivation: DataTypes.TEXT,
        category: DataTypes.STRING,
        author: DataTypes.STRING,
        activity_name: {
            type: DataTypes.STRING,
            defaultValue: 'None',
        },
        activity_type: DataTypes.STRING,
        activity_state: DataTypes.STRING,
        image_url: {
            type: DataTypes.STRING,
            defualtValue: defaultMotivationPictureUrl,
        },
    });
};
