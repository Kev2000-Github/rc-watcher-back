'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('amlArticles', {
            profileId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            link: {
                type: Sequelize.STRING
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('amlArticles')
    }
}