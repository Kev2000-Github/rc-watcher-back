
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./risks.controller')
const {validateRequestSchema, validateResponseSchema, authentication, checkRole, pagination} = require('../../middlewares')
const { ROLES } = require('../../database/constants')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'risks.in-get-risks.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'risks.out-get-risks.schema.js'))),
    pagination,
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR]}),
    controller.get_risks
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    risksRouter: router
}