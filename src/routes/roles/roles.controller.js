
const { controllerWrapper } = require('../../utils/common')
const {Roles, Sequelize} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')
const { ROLES } = require('../../database/constants')

module.exports.get_roles = controllerWrapper(async (req, res) => {
    const { Op } = Sequelize
    const pagination = req.pagination
    const level = req.query.level
    const opts = {...pagination}
    if(level && level == 2) opts.where = {name: {[Op.ne]: ROLES.ADMIN}}
    let roles = await paginate(Roles, opts)
    roles.data = roles.data.map(role => responseData(role))
    res.json({...roles})
})
