const { HttpStatusError } = require('../errors/httpStatusError')
const { controllerWrapper } = require('../utils/common')
const { Sessions, Users, Roles } = require('../database/models')
const { messages } = require('./messages')

const authentication = controllerWrapper(async (req, res, next) => {
    const bearerToken = req.headers['authorization']
    if(!bearerToken) throw HttpStatusError.unauthorize({message: 'Authentication credentials were not provided'})
    const sessionId = bearerToken.split(' ').pop()
    const session = await Sessions.findByPk(sessionId)
    if(!session) throw HttpStatusError.unauthorize(messages.invalidSession)
    const user = await Users.findByPk(session.userId, {include: Roles})
    if(!user) throw HttpStatusError.unauthorize(messages.invalidSession)
    req.user = user
    next()

})

module.exports = {
    authentication
}