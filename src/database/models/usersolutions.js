'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class UserSolutions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    UserSolutions.init({}, {
        sequelize,
        tableName: 'userSolutions',
        modelName: 'UserSolutions',
        timestamps: true,
        paranoid: false
    })
    return UserSolutions
}