
const { controllerWrapper } = require('../../utils/common')
const {Users} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { responseData, includeOpts } = require('./helper')

module.exports.get_users = controllerWrapper(async (req, res) => {
    const {companyId} = req.params
    const pagination = req.pagination
    const opts = {...pagination, ...includeOpts, where: {companyId}}
    let users = await paginate(Users, opts)
    users.data = users.data.map(user => responseData(user))
    res.json({...users})
})

module.exports.get_users_id = controllerWrapper(async (req, res) => {
    const {id, companyId} = req.params
    const options = {...includeOpts, where: {id, companyId}}
    const user = await Users.findOne(options)
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: responseData(user)})
})
