'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('responses', {
            companyId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'companies',
                    key: 'id'
                }
            },
            questionId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            selectionId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'selections',
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
        await queryInterface.dropTable('responses')
    }
}