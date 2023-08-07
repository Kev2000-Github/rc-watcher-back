'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('amlProfiles', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            fullName: {
                type: Sequelize.STRING
            },
            birthdate: {
                type: Sequelize.DATE
            },
            country: {
                type: Sequelize.STRING
            },
            riskLevel: {
                type: Sequelize.STRING
            },
            riskPoints: {
                type: Sequelize.FLOAT
            },
            picture: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('amlProfiles')
    }
}