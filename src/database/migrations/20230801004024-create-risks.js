'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('risks', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            regulationId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'regulations',
                    key: 'id'
                }
            },
            impactScore: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('risks')
    }
}