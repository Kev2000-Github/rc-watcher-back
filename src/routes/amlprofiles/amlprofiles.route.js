
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./amlprofiles.controller')
const {validateRequestSchema, validateResponseSchema, checkRole, authentication} = require('../../middlewares')
const { ROLES } = require('../../database/constants')

router.get(
  '/', 
  validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'amlprofiles.in-get-amlprofiles.schema.js'))),
  validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'amlprofiles.out-get-amlprofiles.schema.js'))),
  authentication,
  checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR]}),
  controller.get_amlprofiles
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
  amlprofilesRouter: router
}