
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./countries.controller')
const {validateRequestSchema, validateResponseSchema, pagination} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'countries.in-get-countries.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'countries.out-get-countries.schema.js'))),
    pagination,
    controller.get_countries
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    countriesRouter: router
}