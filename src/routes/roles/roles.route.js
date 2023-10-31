
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./roles.controller')
const {validateRequestSchema, validateResponseSchema, pagination} = require('../../middlewares')

router.get(
  '/', 
  validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'roles.in-get-roles.schema.js'))),
  validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'roles.out-get-roles.schema.js'))),
  pagination,
  controller.get_roles
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
  rolesRouter: router
}