
const { controllerWrapper } = require('../../utils/common')
const { Countries } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')

module.exports.get_countries = controllerWrapper(async (req, res) => {
  const pagination = req.pagination
  const opts = {...pagination}
  let countries = await paginate(Countries, opts)
  countries.data = countries.data.map(country => responseData(country))
  res.json({...countries})
})