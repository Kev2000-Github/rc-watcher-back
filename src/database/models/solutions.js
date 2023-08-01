'use strict'
const {
    Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { SOLUTION_STATE } = require('../constants')
module.exports = (sequelize, DataTypes) => {
    class Solutions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Solutions.belongsToMany(models.Alerts, {
                through: models.AlertSolutions
            })
            Solutions.belongsToMany(models.Users, {
                through: models.UserSolutions
            })
        }
    }
    Solutions.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        state: enumFields(DataTypes, SOLUTION_STATE, SOLUTION_STATE.ACTIVE)
    }, {
        sequelize,
        tableName: 'solutions',
        modelName: 'Solutions',
        timestamps: true,
        paranoid: true,
    })
    return Solutions
}