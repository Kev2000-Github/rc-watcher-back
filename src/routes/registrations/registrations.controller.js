
const { controllerWrapper } = require('../../utils/common')
const {Users, Companies, Sessions, Roles, sequelize} = require('../../database/models')
const { ROLES } = require('../../database/constants')
const { includeOpts, responseData } = require('../users/helper')
const uuid = require('uuid').v4

module.exports.post_registrations = controllerWrapper(async (req, res) => {
  const {user, company} = req.body
  const {fullName, username, password, email} = user
  let session, userId
  await sequelize.transaction(async transaction => {
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
      companyId: newCompany.id,
      roleId: role.id,
      fullName, 
      username, 
      password, 
      email,
    }, {transaction})
    session = await Sessions.create({
      id: uuid(),
      userId: newUser.id
    }, {transaction})
    userId = newUser.id
  })
  const createdUser = await Users.findByPk(userId, includeOpts)
  res.json({
    user: responseData(createdUser), 
    session: session.id
  })
})

