'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Risks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Risks.belongsTo(models.Regulations, {
        foreignKey: 'regulationId'
      })
      Risks.hasOne(models.ViewRiskScore, {
        foreignKey: 'riskId'
      })
    }
  }
  Risks.init({
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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'risks',
    modelName: 'Risks',
    timestamps: true,
    paranoid: true,
  })
  return Risks
}