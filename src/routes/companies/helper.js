const { responseData: countryResponseData } = require('../countries/helper')

module.exports.responseData = (company) => {
    return company ? {
        id: company.id,
        name: company.name,
        address: company.address,
        Country: countryResponseData(company.Country)
    } : null
}