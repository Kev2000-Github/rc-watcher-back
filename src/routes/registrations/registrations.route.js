
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./registrations.controller')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.post(
  '/', 
  validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'registrations.in-post-registrations.schema.js'))),
  validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'registrations.out-post-registrations.schema.js'))),
  controller.post_registrations
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
  registrationsRouter: router
}