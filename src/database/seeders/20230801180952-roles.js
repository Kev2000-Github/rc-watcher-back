'use strict'

const { ROLES } = require('../constants')
const { enumArray } = require('../helper')

const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    const values = enumArray(ROLES).map(role => ({
      id: uuid(), name: role, createdAt: now, updatedAt: now
    }))
    return queryInterface.bulkInsert('roles', values)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {})
  }
}
