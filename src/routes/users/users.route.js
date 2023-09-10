
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./users.controller')
const {validateRequestSchema, validateResponseSchema, pagination, authentication, checkRole, companyRestiction} = require('../../middlewares')
const { ROLES } = require('../../database/constants')

router.get(
    '/:companyId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR]}),
    companyRestiction,
    pagination,
    controller.get_users
)

router.get(
    '/:companyId/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users-id.schema.js'))),
    authentication,
    companyRestiction,
    controller.get_users_id
)

router.post(
    '/:companyId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-post-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-post-users.schema.js'))),
    authentication,
    companyRestiction,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.post_users
)

router.put(
    '/:companyId/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-put-users-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-put-users-id.schema.js'))),
    authentication,
    companyRestiction,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.put_users_id
)

router.delete(
    '/:companyId/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-delete-users-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-delete-users-id.schema.js'))),
    authentication,
    companyRestiction,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.delete_users_id
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    usersRouter: router
}