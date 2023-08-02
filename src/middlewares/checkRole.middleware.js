const { HttpStatusError } = require('../errors/httpStatusError')
const { controllerWrapper } = require('../utils/common')
const {messages} = require('./messages')

/**
 * This middleware MUST be AFTER authentication middleware
 */
const checkRole = ({whitelist, blacklist}) => controllerWrapper((req, res, next) => {
    const userReceived = req.user
    if(!userReceived) throw HttpStatusError.forbidden(messages.userNotReceived)
    if(whitelist && whitelist.includes(userReceived.Role.id)){
        return next()
    }
    if(blacklist && blacklist.includes(userReceived.Role.id)){
        throw HttpStatusError.forbidden(messages.forbidden)
    }
    next()
})

module.exports = {
    checkRole
}