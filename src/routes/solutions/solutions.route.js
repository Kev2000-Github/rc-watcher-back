
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./solutions.controller')
const {validateRequestSchema, validateResponseSchema, pagination, authentication } = require('../../middlewares')
const { checkRole } = require('../../middlewares/checkRole.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'solutions.in-get-solutions.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'solutions.out-get-solutions.schema.js'))),
    pagination,
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR, ROLES.OPERATOR]}),
    controller.get_solutions
)

router.get(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'solutions.in-get-solutions-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'solutions.out-get-solutions-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR, ROLES.OPERATOR]}),
    controller.get_solutions_id
)

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'solutions.in-post-solutions.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'solutions.out-post-solutions.schema.js'))),
    
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.OPERATOR]}),
    controller.post_solutions
)
router.delete(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'solutions.in-delete-solutions-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'solutions.out-delete-solutions-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.delete_solutions_id
)

router.put(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'solutions.in-put-solutions-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'solutions.out-put-solutions-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.put_solutions_id
)

//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    solutionsRouter: router
}