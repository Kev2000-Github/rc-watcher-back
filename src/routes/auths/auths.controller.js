
const { controllerWrapper } = require('../../utils/common')
const {Users, Sessions, Roles, Companies} = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { verifyPassword } = require('../../utils/common')
const { responseData } = require('../users/helper')
const uuid = require('uuid').v4

module.exports.post_auths = controllerWrapper(async (req, res) => {
    const {companyId: companySlug, username, password} = req.body
    const includeOpts = [Roles, {model: Companies, required: true, where: {slug: companySlug}}]
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
    const {id} = req.params
    const session = await Sessions.findByPk(id)
    if(!session) throw HttpStatusError.notFound(messages.notFound)
    await session.destroy()
    res.json({data: session.id})
})
