
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./regulations.controller')
const {validateRequestSchema, validateResponseSchema, pagination} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'regulations.in-get-regulations.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'regulations.out-get-regulations.schema.js'))),
    pagination,
    controller.get_regulations
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    regulationsRouter: router
}