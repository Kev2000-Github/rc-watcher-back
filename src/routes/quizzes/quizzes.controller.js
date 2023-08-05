
const { controllerWrapper } = require('../../utils/common')
const { Quizzes, Questions, Regulations, Selections, Risks } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, quizFormResponseData } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')

module.exports.get_quizzes_form_id = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const includeOpts = {include: [
        Regulations, 
        {
            model: Questions,
            include: [Selections, Risks]
        }
    ]}
    const options = {...includeOpts, where: {id: quizId}}
    const quiz = await Quizzes.findOne(options)
    if(!quiz) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: quizFormResponseData(quiz)})
})

module.exports.get_quizzes = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const includeOpts = {include: [Questions, Regulations]}
    const opts = {...pagination, ...includeOpts}
    let quizzes = await paginate(Quizzes, opts)
    quizzes.data = quizzes.data.map(quiz => responseData(quiz))
    res.json({...quizzes})
})