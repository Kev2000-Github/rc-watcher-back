'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Companies.belongsToMany(models.Quizzes, {
        through: models.CompanyQuizzes,
        foreignKey: 'companyId'
      })
      Companies.belongsTo(models.Countries, {
        foreignKey: 'country'
      })
    }
  }
  Companies.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      references: {
        model: 'countries',
        key: 'id'
      },
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'companies',
    modelName: 'Companies',
    timestamps: true,
    paranoid: true
  })
  return Companies
}