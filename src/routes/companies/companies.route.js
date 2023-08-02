
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./companies.controller')
const {validateRequestSchema, validateResponseSchema, pagination, authentication} = require('../../middlewares')
const { checkRole } = require('../../middlewares/checkRole.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'companies.in-get-companies.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'companies.out-get-companies.schema.js'))),
    authentication,
    checkRole({blacklist: [ROLES.OPERATOR]}),
    pagination,
    controller.get_companies
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    companiesRouter: router
}