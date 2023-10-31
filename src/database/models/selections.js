'use strict'
const {
  Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { SELECTION_TYPE } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Selections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Selections.belongsTo(models.Questions, {
        foreignKey: 'questionId'
      })
    }
  }
  Selections.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    riskScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: enumFields(DataTypes, SELECTION_TYPE, SELECTION_TYPE.SIMPLE)
  }, {
    sequelize,
    tableName: 'selections',
    modelName: 'Selections',
    timestamps: true,
    paranoid: true
  })
  return Selections
}