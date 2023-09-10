
const { controllerWrapper } = require('../../utils/common')
const { Regulations } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')

module.exports.get_regulations = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let regulations = await paginate(Regulations, opts)
    regulations.data = regulations.data.map(regulation => responseData(regulation))
    res.json({...regulations})
})