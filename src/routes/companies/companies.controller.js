
const { controllerWrapper } = require('../../utils/common')
const { Companies } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, includeOpts } = require('./helper')
const { messages } = require('./messages')
const { HttpStatusError } = require('../../errors/httpStatusError')

module.exports.get_companies = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination, ...includeOpts}
    let companies = await paginate(Companies, opts)
    companies.data = companies.data.map(company => responseData(company))
    res.json({...companies})
})

module.exports.get_companies_id = controllerWrapper(async (req, res) => {
    const {companyId} = req.params
    const options = {...includeOpts}
    const company = await Companies.findByPk(companyId, options)
    if(!company) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: responseData(company)})
})