
const { controllerWrapper } = require('../../utils/common')
const {Users, Companies, Sessions, Countries, Roles, sequelize} = require('../../database/models')
const { ROLES } = require('../../database/constants')
const uuid = require('uuid').v4

module.exports.post_registrations = controllerWrapper(async (req, res) => {
    await sequelize.transaction(async transaction => {
        const {user, company} = req.body
        const {fullName, username, password, email} = user
        const newCompany = await Companies.create({
            id: uuid(),
            slug: company.companyId,
            name: company.name,
            country: company.countryId,
            address: company.address
        }, {transaction})
        const role = await Roles.findOne({where: {name: ROLES.ADMIN}})
        const newUser = await Users.create({
            id: uuid(),
            companySlug: newCompany.slug,
            roleId: role.id,
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
                role: role.name,
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

