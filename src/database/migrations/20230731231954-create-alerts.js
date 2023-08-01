'use strict'
const { enumArray } = require('../helper')
const { ALERT_STATE, ALERT_PRIORITY } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('alerts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            priority: {
                type: Sequelize.ENUM(...enumArray(ALERT_PRIORITY)),
                allowNull: false
            },
            state: {
                type: Sequelize.ENUM(...enumArray(ALERT_STATE)),
                allowNull: false
            },
            createdBy: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            regulationId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'regulations',
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
        await queryInterface.dropTable('alerts')
    }
}