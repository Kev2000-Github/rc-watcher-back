'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('companies', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'countries',
                    key: 'id'
                }
            },
            address: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('companies')
    }
}