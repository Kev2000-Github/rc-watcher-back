
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./auths.controller')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'auths.in-post-auths.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'auths.out-post-auths.schema.js'))),
    controller.post_auths
)

router.delete(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'auths.in-delete-auths.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'auths.out-delete-auths.schema.js'))),
    controller.delete_auths
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    authsRouter: router
}