
const { controllerWrapper } = require('../../utils/common')
const { Quizzes, Companies, Questions, Regulations, Selections, Risks, Responses, Documents, sequelize } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, quizFormResponseData, validateQuizRequest } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')
const { DOCUMENT_TYPE } = require('../../database/constants')
const uuid = require('uuid').v4

const companyInclude = (id) => {
    return {model: Companies, where: {id}, required: false}
}

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
    const companyId = req.user.Company.id
    const includeOpts = {include: [Questions, Regulations, companyInclude(companyId)]}
    const opts = {...pagination, ...includeOpts}
    let quizzes = await paginate(Quizzes, opts)
    quizzes.data = quizzes.data.map(quiz => responseData(quiz))
    res.json({...quizzes})
})

module.exports.post_quizzes_form_quizId = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const {responses} = req.body
    const companyId = req.user.Company.id
    const quiz = await Quizzes.findByPk(quizId, {include: companyInclude(companyId)})
    if(!quiz){
        throw HttpStatusError.notFound(messages.notFound)
    }
    if(quiz.Companies.length > 0){
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
        await quiz.addCompany(companyId, {transaction})
        res.json({data: {created: responseData.length}})    
    })
})

module.exports.put_quizzes_form_quizId = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const {responses} = req.body
    const companyId = req.user.Company.id
    const questionIds = responses.map(resp => resp.questionId)
    const opts = {where: {companyId, questionId: questionIds}}
    const quiz = await Quizzes.findByPk(quizId, {include: companyInclude(companyId)})
    if(!quiz){
        throw HttpStatusError.notFound(messages.notFound)
    }
    if(quiz.Companies.length === 0){
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
        await Responses.destroy({...opts, transaction})
        await Documents.destroy({...opts, transaction})
        await Responses.bulkCreate(responseFormatted, {transaction})
        await Documents.bulkCreate(documentFormatted, {transaction})
        res.json({data: {created: true}})    
    })
})

module.exports.delete_quizzes_form_quizId = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const companyId = req.user.Company.id
    const quiz = await Quizzes.findByPk(quizId, {include: [Questions, companyInclude(companyId)]})
    if(!quiz){
        throw HttpStatusError.notFound(messages.notFound)
    }
    if(quiz.Companies.length === 0){
        throw HttpStatusError.unprocesableEntity(messages.quizNotCompleted)
    }
    return sequelize.transaction(async transaction => {
        await quiz.removeCompany(companyId, {transaction})
        const questionId = quiz.Questions.map(question => question.id)
        await Responses.destroy({where: {companyId, questionId}, transaction})
        await Documents.destroy({where: {companyId, questionId}, transaction})
        res.json({data: {deleted: true}})
    })
})