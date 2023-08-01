
const { controllerWrapper } = require('../../utils/common')
const {Users, Companies, Sessions, Countries, sequelize} = require('../../database/models')
const uuid = require('uuid').v4

module.exports.post_registrations = controllerWrapper(async (req, res) => {
    return sequelize.transaction(async transaction => {
        const {user, company} = req.body
        const {fullName, username, password, email} = user
        const newCompany = await Companies.create({
            id: uuid(),
            name: company.name,
            country: company.countryId,
            address: company.address
        }, {transaction})
        const newUser = await Users.create({
            id: uuid(),
            companyId: newCompany.id,
            fullName, 
            username, 
            password, 
            email,
        }, {transaction})
        const session = await Sessions.create({
            id: uuid(),
            userId: newUser.id
        }, {transaction})
        const country = await Countries.findByPk(company.countryId)

        res.json({
            company: {
                id: company.id,
                name: company.name,
                address: company.address,
                country: country.name
            }, 
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
            }, 
            session: {
                id: session.id
            }
        })
    })
})

