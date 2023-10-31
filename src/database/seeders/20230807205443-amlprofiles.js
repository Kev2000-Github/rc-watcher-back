'use strict'
const { resolve } = require('path')
const dataPath = resolve(__dirname, `${__filename}.json`)
const data = require(dataPath)
const uuid = require('uuid').v4

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    const profiles = []
    const articles = []
    const sanctions = []
    for(const val of data){
      const profileId = uuid()
      profiles.push({
        id: profileId,
        fullName: val.fullName,
        country: val.country,
        birthdate: val.birthdate,
        riskLevel: val.riskLevel,
        riskPoints: val.riskPoints,
        picture: val.picture,
        createdAt: now,
        updatedAt: now
      })
      for(const art of val.articles){
        articles.push({
          profileId,
          content: art.content,
          link: art.link
        })
      }
      for(const san of val.sanctions){
        sanctions.push({
          profileId,
          content: san
        })
      }
    }
    await queryInterface.bulkInsert('amlProfiles', profiles)
    await queryInterface.bulkInsert('amlArticles', articles)
    await queryInterface.bulkInsert('amlSanctions', sanctions)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('amlArticles', null, {})
    await queryInterface.bulkDelete('amlSanctions', null, {})
    await queryInterface.bulkDelete('amlProfiles', null, {})
  }
}
