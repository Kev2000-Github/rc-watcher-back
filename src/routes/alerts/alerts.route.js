
const { Router } = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./alerts.controller')
const { validateRequestSchema, validateResponseSchema, pagination, authentication } = require('../../middlewares')
const { checkRole } = require('../../middlewares/checkRole.middleware')
const { ROLES } = require('../../database/constants')

router.get(
    '/',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'alerts.in-get-alerts.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'alerts.out-get-alerts.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR, ROLES.OPERATOR]}),
    pagination,
    controller.get_alerts
)

router.get(
    '/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'alerts.in-get-alerts-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'alerts.out-get-alerts-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.AUDITOR, ROLES.OPERATOR]}),
    controller.get_alerts_id
)

router.post(
    '/',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'alerts.in-post-alerts.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'alerts.out-post-alerts.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN, ROLES.OPERATOR]}),
    controller.post_alerts
)

router.put(
    '/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'alerts.in-put-alerts-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'alerts.out-put-alerts-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.put_alerts_id
)

router.delete(
    '/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'alerts.in-delete-alerts-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'alerts.out-delete-alerts-id.schema.js'))),
    authentication,
    checkRole({whitelist: [ROLES.ADMIN]}),
    controller.delete_alerts_id
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    alertsRouter: router
}