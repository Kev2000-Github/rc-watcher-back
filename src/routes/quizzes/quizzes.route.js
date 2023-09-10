
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./quizzes.controller')
const {validateRequestSchema, validateResponseSchema, pagination, authentication} = require('../../middlewares')
const { checkRole } = require('../../middlewares/checkRole.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/form/:quizId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-get-quizzes-form-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-get-quizzes-form-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.get_quizzes_form_id
)

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-get-quizzes.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-get-quizzes.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    pagination,
    controller.get_quizzes
)

router.post(
    '/form/:quizId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-post-quizzes-form-quiz-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-post-quizzes-form-quiz-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.post_quizzes_form_quizId
)

router.put(
    '/form/:quizId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-put-quizzes-form-quiz-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-put-quizzes-form-quiz-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.put_quizzes_form_quizId
)

router.delete(
    '/form/:quizId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-delete-quizzes-form-quiz-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-delete-quizzes-form-quiz-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.delete_quizzes_form_quizId
)

router.get(
    '/document/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'quizzes.in-get-quizzes-document-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'quizzes.out-get-quizzes-document-id.schema.js'))),
    controller.get_quizzes_document_id
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    quizzesRouter: router
}