'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Responses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Responses.belongsTo(models.Companies, {
        foreignKey: 'companyId'
      })
      Responses.belongsTo(models.Questions, {
        foreignKey: 'questionId'
      })
      Responses.belongsTo(models.Selections, {
        foreignKey: 'selectionId'
      })
    }
  }
  Responses.init({
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    selectionId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'selections',
        key: 'id'
      }
    },
  }, {
    sequelize,
    tableName: 'responses',
    modelName: 'Responses',
    timestamps: true,
    paranoid: false,
        
  })
  return Responses
}