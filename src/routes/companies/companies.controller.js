
const { controllerWrapper } = require('../../utils/common')
const { Companies } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')

module.exports.get_companies = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let companies = await paginate(Companies, opts)
    companies.data = companies.data.map(company => responseData(company))
    res.json({...companies})
})