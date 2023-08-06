
const { controllerWrapper } = require('../../utils/common')
const { Quizzes, Users, Questions, Regulations, Selections, Risks, Responses, Documents, sequelize } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, quizFormResponseData, validateQuizRequest } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')
const { DOCUMENT_TYPE } = require('../../database/constants')
const uuid = require('uuid').v4

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
    const includeOpts = {include: [Questions, Regulations, {model: Users, where: {id: req.user.id}, required: false}]}
    const opts = {...pagination, ...includeOpts}
    let quizzes = await paginate(Quizzes, opts)
    quizzes.data = quizzes.data.map(quiz => responseData(quiz))
    res.json({...quizzes})
})

module.exports.post_quizzes_form_quizId = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const {responses} = req.body
    const companyId = req.user.Company.id
    const quiz = await Quizzes.findByPk(quizId, {include: {model: Users, required: false}})
    if(!quiz){
        throw HttpStatusError.notFound(messages.notFound)
    }
    if(quiz.Users.length > 0){
        throw HttpStatusError.unprocesableEntity(messages.quizCompleted)
    }
    await validateQuizRequest(quizId, responses)
    return sequelize.transaction(async transaction => {
        const responseFormatted = responses.map(response => ({
            companyId,
            questionId: response.questionId,
            selectionId: response.selectionId
        }))
        const documentFormatted = responses.reduce((prev, curr) => {
            if(curr.document){
                const data = {
                    id: uuid(),
                    companyId,
                    questionId: curr.questionId,
                    file: curr.document,
                    type: DOCUMENT_TYPE.JPG
                }
                return [...prev, data]
            }
            return prev
        }, [])
        
        const responseData = await Responses.bulkCreate(responseFormatted, {transaction})
        await Documents.bulkCreate(documentFormatted, {transaction})
        await quiz.addUser(req.user.id, {transaction})
        res.json({data: {created: responseData.length}})    
    })
})

module.exports.put_quizzes_form_quizId = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const {responses} = req.body
    const companyId = req.user.Company.id
    const questionIds = responses.map(resp => resp.questionId)
    const opts = {where: {companyId, questionId: questionIds}}
    const existingResponses = await Responses.findAll(opts)
    if(existingResponses.length === 0){
        throw HttpStatusError.unprocesableEntity(messages.quizNotCompleted)
    }
    await validateQuizRequest(quizId, responses)
    return sequelize.transaction(async transaction => {
        const responseFormatted = responses.map(response => ({
            companyId,
            questionId: response.questionId,
            selectionId: response.selectionId
        }))
        const documentFormatted = responses.reduce((prev, curr) => {
            if(curr.document){
                const data = {
                    id: uuid(),
                    companyId,
                    questionId: curr.questionId,
                    file: curr.document,
                    type: DOCUMENT_TYPE.JPG
                }
                return [...prev, data]
            }
            return prev
        }, [])
        await Responses.destroy(opts)
        const responseData = await Responses.bulkCreate(responseFormatted, {transaction})
        await Documents.bulkCreate(documentFormatted, {transaction})
        res.json({data: {created: responseData.length}})    
    })
})