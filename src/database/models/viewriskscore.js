'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ViewRiskScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    ViewRiskScore.init({
        companyId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        riskId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        riskScore: DataTypes.FLOAT,
    }, {
        sequelize,
        tableName: 'viewRiskScore',
        modelName: 'ViewRiskScore',
        timestamps: false
    })
    return ViewRiskScore
}