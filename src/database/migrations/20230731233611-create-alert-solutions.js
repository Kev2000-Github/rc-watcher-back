'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('alertSolutions', {
            alertId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'alerts',
                    key: 'id'
                }
            },
            solutionId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'solutions',
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
            deletedAt: {
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('alertSolutions')
    }
}