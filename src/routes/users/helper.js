const { responseData: roleResponseData } = require('../roles/helper')
const { responseData: companyResponseData } = require('../companies/helper')

module.exports.responseData = (user) => {
    return user ? {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        Company: companyResponseData(user.Company),
        Role: roleResponseData(user.Role)
    } : null
}