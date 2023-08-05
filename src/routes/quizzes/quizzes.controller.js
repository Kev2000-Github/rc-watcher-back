
const { controllerWrapper } = require('../../utils/common')
const { Quizzes, Questions, Regulations } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')

module.exports.get_quizzes_form_id = controllerWrapper(async (req, res) => {
    //const {id} = req.body

})

module.exports.get_quizzes = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const includeOpts = {include: [Questions, Regulations]}
    const opts = {...pagination, ...includeOpts}
    let quizzes = await paginate(Quizzes, opts)
    quizzes.data = quizzes.data.map(quiz => responseData(quiz))
    res.json({...quizzes})
})