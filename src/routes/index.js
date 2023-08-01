const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
router.use('/registrations', require('./registrations/registrations.route').registrationsRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}