'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('userQuizzes', {
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('userQuizzes')
    }
}