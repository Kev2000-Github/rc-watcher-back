const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
router.use('/registrations', require('./registrations/registrations.route').registrationsRouter)
router.use('/auths', require('./auths/auths.route').authsRouter)
router.use('/users', require('./users/users.route').usersRouter)
router.use('/roles', require('./roles/roles.route').rolesRouter)
router.use('/companies', require('./companies/companies.route').companiesRouter)
router.use('/countries', require('./countries/countries.route').countriesRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}