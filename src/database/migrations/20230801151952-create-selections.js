'use strict'
const { enumArray } = require('../helper')
const { SELECTION_TYPE } = require('../constants')

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
            riskScore: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM(...enumArray(SELECTION_TYPE)),
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