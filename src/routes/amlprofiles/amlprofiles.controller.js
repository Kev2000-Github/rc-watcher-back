
const { controllerWrapper } = require('../../utils/common')
const { AMLProfiles, AMLArticles, AMLSanctions, Sequelize } = require('../../database/models')
const { responseData } = require('./helper')

module.exports.get_amlprofiles = controllerWrapper(async (req, res) => {
  const {Op} = Sequelize
  const {fullName, country, birthdate} = req.query
  const fullNameFormatted = fullName.replaceAll('-',' ').trim()
  const optsWhere = {
    fullName: {
      [Op.like]: `%${fullNameFormatted}%`
    }
  }
  if(country) optsWhere.country = country
  if(birthdate) optsWhere.birthdate = birthdate
  const profile = await AMLProfiles.findOne({
    where: optsWhere,
    include: [AMLArticles, AMLSanctions]
  })
  res.json({data: responseData(profile)})
})