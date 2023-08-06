'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class userquizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    userquizzes.init({}, {
        sequelize,
        tableName: 'userQuizzes',
        modelName: 'UserQuizzes',
        timestamps: true,
        paranoid: false
    })
    return userquizzes
}