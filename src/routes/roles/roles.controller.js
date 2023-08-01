
const { controllerWrapper } = require('../../utils/common')
const {Roles} = require('../../database/models')
const { paginate } = require('../../database/helper')

const responseData = (role) => {
    return role ? {
        id: role.id,
        name: role.name
    } : null
}
module.exports.responseData = responseData

module.exports.get_roles = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let roles = await paginate(Roles, opts)
    roles.data = roles.data.map(role => responseData(role))
    res.json({...roles})
})
