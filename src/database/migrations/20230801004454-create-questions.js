'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('questions', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            riskId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'risks',
                    key: 'id'
                }
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            hasDoc: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            hasFrequencyPoints: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('questions')
    }
}