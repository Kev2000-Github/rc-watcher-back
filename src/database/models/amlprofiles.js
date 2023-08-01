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
            // define association here
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
        articles: DataTypes.TEXT,
        sanctions: DataTypes.TEXT,
        riskLevel: DataTypes.INTEGER,
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