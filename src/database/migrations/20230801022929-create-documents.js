'use strict'
const { enumArray } = require('../helper')
const { DOCUMENT_TYPE } = require('../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('documents', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            companyId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: 'id'
                }
            },
            questionId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            type: {
                type: Sequelize.ENUM(...enumArray(DOCUMENT_TYPE))
            },
            file: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('documents')
    }
}