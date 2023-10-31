const { controllerWrapper } = require('../utils/common')
const { HttpStatusError } = require('../errors/httpStatusError')
const {messages} = require('./messages')

/**
 * This middleware MUST be AFTER authentication middleware
 */
const companyRestiction = controllerWrapper((req, res, next) => {
  const userReceived = req.user
  const {companyId} = req.params
  if(userReceived.Company.id !== companyId) throw HttpStatusError.forbidden(messages.forbidden)
  next()
})

module.exports = {
  companyRestiction
}