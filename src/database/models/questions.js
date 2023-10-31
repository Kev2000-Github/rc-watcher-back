'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Questions.belongsTo(models.Risks, {
        foreignKey: 'riskId'
      })
      Questions.belongsTo(models.Quizzes, {
        foreignKey: 'quizId'
      })
      Questions.hasMany(models.Selections, {
        foreignKey: 'questionId'
      })
    }
  }
  Questions.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUIDV4
    },
    riskId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'risks',
        key: 'id'
      }
    },
    quizId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hasDoc: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isMultiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'questions',
    modelName: 'Questions',
    timestamps: true,
    paranoid: true
  })
  return Questions
}