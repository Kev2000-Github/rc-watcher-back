'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('amlSanctions', {
            profileId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('amlSanctions')
    }
}