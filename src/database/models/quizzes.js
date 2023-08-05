'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Quizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Quizzes.belongsTo(models.Regulations, {
                foreignKey: 'regulationId'
            })
            Quizzes.hasMany(models.Questions, {
                foreignKey: 'quizId'
            })
        }
    }
    Quizzes.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        regulationId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'regulations',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'quizzes',
        modelName: 'Quizzes',
        timestamps: true,
        paranoid: true
    })
    return Quizzes
}