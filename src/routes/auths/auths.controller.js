
const { controllerWrapper } = require('../../utils/common')
const {Users, Sessions, Roles, Companies, Countries} = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { verifyPassword } = require('../../utils/common')
const { responseData } = require('../users/helper')
const uuid = require('uuid').v4

module.exports.post_auths = controllerWrapper(async (req, res) => {
    const {companyId: companySlug, username, password} = req.body
    const includeOpts = [
        Roles, 
        {
            model: Companies, 
            required: true, 
            where: {slug: companySlug},
            include: [Countries]
        }
    ]
    const user = await Users.findOne({where: {username}, include: includeOpts})
    if(!user) throw HttpStatusError.unauthorize(messages.credentials)
    const isSame = await verifyPassword(password, user.password)
    if(!isSame) throw HttpStatusError.unauthorize(messages.credentials)
    const session = await Sessions.create({
        id: uuid(),
        userId: user.id
    })
    res.json({
        user: responseData(user),
        session: session.id
    })
})

module.exports.delete_auths = controllerWrapper(async (req, res) => {
    const bearerToken = req.headers['authorization']
    if(!bearerToken) throw HttpStatusError.unauthorize({message: 'Authentication credentials were not provided'})
    const sessionId = bearerToken.split(' ').pop()
    const session = await Sessions.findByPk(sessionId)
    if(!session) throw HttpStatusError.notFound(messages.notFound)
    await session.destroy()
    res.json({data: session.id})
})
