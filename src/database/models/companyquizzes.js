'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CompanyQuizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyQuizzes.init({}, {
    sequelize,
    tableName: 'companyQuizzes',
    modelName: 'CompanyQuizzes',
    timestamps: true,
    paranoid: false
  })
  return CompanyQuizzes
}