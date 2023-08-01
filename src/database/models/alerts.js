'use strict'
const {
    Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { ALERT_PRIORITY, ALERT_STATE } = require('../constants')

module.exports = (sequelize, DataTypes) => {
    class Alerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Alerts.belongsToMany(models.Solutions, {
                through: models.AlertSolutions
            })
            Alerts.belongsTo(models.Users, {
                foreignKey: 'createdBy'
            })
            Alerts.belongsTo(models.Regulations, {
                foreignKey: 'regulationId'
            })
        }
    }
    Alerts.init({
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
        priority: enumFields(DataTypes, ALERT_PRIORITY, ALERT_PRIORITY.LOW),
        state: enumFields(DataTypes, ALERT_STATE, ALERT_STATE.PENDING),
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        regulationId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'regulations',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: 'alerts',
        modelName: 'Alerts',
        timestamps: true,
        paranoid: true
    })
    return Alerts
}