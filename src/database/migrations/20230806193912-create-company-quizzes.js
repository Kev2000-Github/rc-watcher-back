'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companyQuizzes', {
      companyId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        }
      },
      quizId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companyQuizzes')
  }
}