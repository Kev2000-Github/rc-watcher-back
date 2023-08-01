'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Sessions.belongsTo(models.Users, {
                foreignKey: 'userId'
            })
        }
    }
    Sessions.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                models: 'users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'sessions',
        modelName: 'Sessions',
        timestamps: true,
        paranoid: false
    })
    return Sessions
}