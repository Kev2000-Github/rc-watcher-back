
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./users.controller')
const {validateRequestSchema, validateResponseSchema, pagination, authentication} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users.schema.js'))),
    authentication,
    pagination,
    controller.get_users
)

router.get(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users-id.schema.js'))),
    authentication,
    controller.get_users_id
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    usersRouter: router
}