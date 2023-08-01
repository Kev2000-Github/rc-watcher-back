
const { controllerWrapper } = require('../../utils/common')
const {Users, Roles, Companies, Countries} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { responseData: roleResponseData } = require('../roles/roles.controller')
const { responseData: companyResponseData } = require('../companies/companies.controller')

const responseData = (user) => {
    return user ? {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        Company: companyResponseData(user.Company),
        Role: roleResponseData(user.Role)
    } : null
}
module.exports.responseData = responseData

const includeOpts = {include: [Roles, {model: Companies, include: [Countries]}]}

module.exports.get_users = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination, ...includeOpts}
    let users = await paginate(Users, opts)
    users.data = users.data.map(user => responseData(user))
    res.json({...users})
})


module.exports.get_users_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const user = await Users.findByPk(id, includeOpts)
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: responseData(user)})
})
