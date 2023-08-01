
const { controllerWrapper } = require('../../utils/common')
const { Companies } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData: countryResponseData } = require('../countries/countries.controller')

const responseData = (company) => {
    return company ? {
        id: company.id,
        name: company.name,
        address: company.address,
        Country: countryResponseData(company.Country)
    } : null
}
module.exports.responseData = responseData

module.exports.get_companies = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let companies = await paginate(Companies, opts)
    companies.data = companies.data.map(company => responseData(company))
    res.json({...companies})
})