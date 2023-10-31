
const { controllerWrapper } = require('../../utils/common')
const {Users} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { responseData, includeOpts, isValidRole } = require('./helper')
const uuid = require('uuid').v4

module.exports.get_users = controllerWrapper(async (req, res) => {
  const {companyId} = req.params
  const pagination = req.pagination
  const opts = {...pagination, ...includeOpts, where: {companyId}}
  let users = await paginate(Users, opts)
  users.data = users.data.map(user => responseData(user))
  res.json({...users})
})

module.exports.get_users_id = controllerWrapper(async (req, res) => {
  const {id, companyId} = req.params
  const options = {...includeOpts, where: {id, companyId}}
  const user = await Users.findOne(options)
  if(!user) throw HttpStatusError.notFound(messages.notFound)
  res.json({data: responseData(user)})
})

module.exports.post_users = controllerWrapper(async (req, res) => {
  const { username, email, password, fullName, roleId } = req.body
  const {companyId} = req.params
  const isRoleValid = await isValidRole(roleId)
  if(!isRoleValid) throw HttpStatusError.badRequest(messages.invalidRole)
  const userId = uuid()
  await Users.create({
    id: userId,
    companyId,
    username,
    email,
    password,
    fullName,
    roleId
  })
  const newUser = await Users.findByPk(userId, includeOpts)
  res.json({data: responseData(newUser)})
})

module.exports.put_users_id = controllerWrapper(async (req, res) => {
  const { id, companyId } = req.params
  const { username, password, fullName, roleId } = req.body
  const user = await Users.findOne({ where: { id, companyId }, ...includeOpts})
  if(!user) throw HttpStatusError.notFound(messages.notFound)
  const isRoleValid = await isValidRole(roleId)
  if(!isRoleValid) throw HttpStatusError.badRequest(messages.invalidRole)
  await user.update({
    username,
    password,
    fullName,
    roleId
  })
  res.json({data: responseData(user)})
})

module.exports.delete_users_id = controllerWrapper(async (req, res) => {
  const { id, companyId } = req.params
  const user = await Users.findOne({ where: { id, companyId }, ...includeOpts})
  if(!user) throw HttpStatusError.notFound(messages.notFound)
  await user.destroy()
  res.json({data: responseData(user)})
})
