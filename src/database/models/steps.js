'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Steps.belongsTo(models.Solutions, {
                foreignKey: 'solutionId'
            })
        }
    }
    Steps.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        solutionId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'solutions',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'steps',
        modelName: 'Steps',
        timestamps: true,
        paranoid: false,
    })
    return Steps
}