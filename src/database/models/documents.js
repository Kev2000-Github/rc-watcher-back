'use strict'
const {
  Model
} = require('sequelize')
const { enumFields } = require('../helper')
const { DOCUMENT_TYPE } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Documents.belongsTo(models.Companies, {
        foreignKey: 'companyId'
      })
      Documents.belongsTo(models.Questions, {
        foreignKey: 'questionId'
      })
    }
  }
  Documents.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    companyId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: enumFields(DataTypes, DOCUMENT_TYPE),
    file: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'documents',
    modelName: 'Documents',
    timestamps: true,
    paranoid: false
  })
  return Documents
}