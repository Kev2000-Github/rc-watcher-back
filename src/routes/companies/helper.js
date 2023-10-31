const { responseData: countryResponseData } = require('../countries/helper')
const {Countries} = require('../../database/models')

module.exports.responseData = (company) => {
  return company ? {
    id: company.id,
    name: company.name,
    address: company.address,
    Country: countryResponseData(company.Country)
  } : null
}

module.exports.includeOpts = {include: [Countries]}
