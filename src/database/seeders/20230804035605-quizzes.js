'use strict'
const { resolve } = require('path')
const uuid = require('uuid').v4
const { Regulations } = require('../models')
const dataPath = resolve(__dirname, `${__filename}.json`)
const data = require(dataPath)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const regulationMap = {}
        const riskMap = {}
        const quizMap = {}
        const questions = []
        const selections = []

        const now = new Date()
        const regulations = await Regulations.findAll()
        for(const regulation of regulations){
            regulationMap[regulation.name] = regulation.id
        }
        //Fill arrays with the data to be inserted
        for(const question of data){
            const questionUuid = uuid()
            if(!riskMap[question.risk]) riskMap[question.risk] = {
                id: uuid(),
                regulationId: regulationMap[question.regulation]
            }
            if(!quizMap[question.quiz]) quizMap[question.quiz] = uuid()
            questions.push({
                id: questionUuid,
                riskId: riskMap[question.risk].id,
                quizId: quizMap[question.quiz],
                description: question.question,
                isMultiple: question.isMultiple,
                hasDoc: question.hasDoc,
                createdAt: now,
                updatedAt: now
            })
            for(const option of question.options){
                selections.push({
                    id: uuid(),
                    questionId: questionUuid,
                    description: option.description,
                    riskScore: option.riskScore,
                    createdAt: now,
                    updatedAt: now
                })
            }
            
        }
        //BulkInserts
        await queryInterface.bulkInsert('quizzes', Object.keys(quizMap).map(key => ({
            id: quizMap[key],
            name: key,
            createdAt: now,
            updatedAt: now
        })))
        await queryInterface.bulkInsert('risks', Object.keys(riskMap).map(key => ({
            id: riskMap[key].id,
            regulationId: riskMap[key].regulationId,
            name: key,
            createdAt: now,
            updatedAt: now
        })))
        await queryInterface.bulkInsert('questions', questions)
        await queryInterface.bulkInsert('selections', selections)
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('selections', null, {})
        await queryInterface.bulkDelete('questions', null, {})
        await queryInterface.bulkDelete('risks', null, {})
        await queryInterface.bulkDelete('quizzes', null, {})
    }
}
