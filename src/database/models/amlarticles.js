'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class AMLArticles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    AMLArticles.init({
        profileId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'amlArticles',
        modelName: 'AMLArticles',
        timestamps: false
    })
    return AMLArticles
}