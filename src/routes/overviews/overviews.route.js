
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./overviews.controller')
const {validateRequestSchema, validateResponseSchema, authentication, checkRole} = require('../../middlewares')
const { ROLES } = require('../../database/constants')
router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'overviews.in-get-overviews.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'overviews.out-get-overviews.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.get_overviews
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    overviewsRouter: router
}