'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('selections', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            questionId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            frequencyScore: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            controlScore: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('selections')
    }
}