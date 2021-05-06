module.exports = (sequelize, DataTypes) => {
    return sequelize.define('subscribers', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: DataTypes.STRING,
        server_id: DataTypes.STRING,
    });
};
