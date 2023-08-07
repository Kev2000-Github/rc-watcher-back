'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class AMLProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            AMLProfiles.hasMany(models.AMLSanctions, {
                foreignKey: 'profileId'
            })
            AMLProfiles.hasMany(models.AMLArticles, {
                foreignKey: 'profileId'
            })
        }
    }
    AMLProfiles.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        fullName: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        country: DataTypes.STRING,
        riskLevel: DataTypes.STRING,
        riskPoints: DataTypes.FLOAT,
        picture: DataTypes.TEXT
    }, {
        sequelize,
        tableName: 'amlProfiles',
        modelName: 'AMLProfiles',
        timestamps: true,
        paranoid: true
    })
    return AMLProfiles
}