module.exports = (sequelize, DataTypes) => {
    return sequelize.define('motivations', {
        motivation: DataTypes.TEXT,
        author: DataTypes.STRING,
        image_url: DataTypes.STRING,
    });
};
