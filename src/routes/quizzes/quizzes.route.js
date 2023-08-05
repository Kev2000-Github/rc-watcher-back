
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./quizzes.controller')
const {validateRequestSchema, validateResponseSchema, pagination} = require('../../middlewares')

router.get(
    '/form/:quizId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-get-quizzes-form-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-get-quizzes-form-id.schema.js'))),
    controller.get_quizzes_form_id
)

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-get-quizzes.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-get-quizzes.schema.js'))),
    pagination,
    controller.get_quizzes
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    quizzesRouter: router
}