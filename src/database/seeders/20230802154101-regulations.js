'use strict'
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const now = new Date()
        return queryInterface.bulkInsert('regulations', [
            {id: uuid(), name: 'AML', description: 'Anti Lavado de dinero', createdAt: now, updatedAt: now},
            {id: uuid(), name: 'Impuestos', description: 'Impuestos Tributarios', createdAt: now, updatedAt: now},
            {id: uuid(), name: 'Seguridad', description: 'Seguridad Informatica', createdAt: now, updatedAt: now}
        ])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('regulations', null, {})
    }
}
