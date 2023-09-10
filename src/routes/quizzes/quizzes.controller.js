
const { controllerWrapper } = require('../../utils/common')
const { Quizzes, Questions, Regulations, Selections, Risks, Responses, Documents, sequelize } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, quizFormResponseData, validateQuizRequest, companyInclude, getQuizesFilters } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')
const { s3Provider } = require('../../providers/s3')
const uuid = require('uuid').v4
const { Readable } = require('stream')

module.exports.get_quizzes_form_id = controllerWrapper(async (req, res) => {
    const {quizId} = req.params
    const companyId = req.user.Company.id
    const includeOpts = {include: [
        Regulations, 
        {
            model: Questions,
            include: [Selections, Risks]
        },
        companyInclude(companyId)
    ]}
    const options = {...includeOpts, where: {id: quizId}}
    let quiz = await Quizzes.findOne(options)
    if(!quiz) throw HttpStatusError.notFound(messages.notFound)
    if(quiz.isCompleted()){
        const questionIds = quiz.Questions.map(question => question.id)
        const opts = {where: {
            companyId,
            questionId: questionIds
        }}
        const responses = await Responses.findAll(opts)
        const documents = await Documents.findAll(opts)
        const resSelectionIds = responses.map(resp => resp.selectionId)
        const questionsResp = quiz.Questions.map(question => {
            question.Document = documents.find(doc => doc.questionId === question.id)
            const newSelections = question.Selections.map(selection => {
                if(resSelectionIds.includes(selection.id)){
                    selection.selected = true
                    return selection
                }
                return selection
            })
            question.Selections = newSelections
            return question
        })
        quiz.Questions = questionsResp
    }
    res.json({data: quizFormResponseData(quiz)})
})

module.exports.get_quizzes = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const companyId = req.user.Company.id
    let opts = getQuizesFilters(companyId, req.query)
    opts = {...opts, ...pagination}
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
    if(quiz.isCompleted()){
        throw HttpStatusError.unprocesableEntity(messages.quizCompleted)
    }
    await validateQuizRequest(quizId, responses)
    return sequelize.transaction(async transaction => {
        const responseFormatted = responses.map(response => ({
            companyId,
            questionId: response.questionId,
            selectionId: response.selectionId
        }))
        const documents = []
        for(const resp of responses){
            if(!resp.document) continue
            const docType = await s3Provider.getFileType(resp.document.content)
            if(!docType) throw HttpStatusError.unprocesableEntity(messages.docNotValid)
            const data = {
                id: uuid(),
                companyId,
                questionId: resp.questionId,
                name: resp.document.name,
                file: resp.document.content,
                type: docType.mime
            }
            documents.push(data)
        }

        const documentFormatted = await Promise.all(documents.map(async doc => {
            const key = `system3-${doc.id}-${doc.name}`
            const resource = s3Provider.base64ToBuffer(doc.file)
            await s3Provider.upload(key, resource, doc.type)
            return {...doc, file: key}
        }))
        
        await Responses.bulkCreate(responseFormatted, {transaction})
        await Documents.bulkCreate(documentFormatted, {transaction})
        await quiz.addCompany(companyId, {transaction})
        res.json({data: {created: true}})    
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
    if(!quiz.isCompleted()){
        throw HttpStatusError.unprocesableEntity(messages.quizNotCompleted)
    }
    await validateQuizRequest(quizId, responses)
    return sequelize.transaction(async transaction => {
        const responseFormatted = responses.map(response => ({
            companyId,
            questionId: response.questionId,
            selectionId: response.selectionId
        }))
        const documents = []
        for(const resp of responses){
            if(!resp.document) continue
            const docType = await s3Provider.getFileType(resp.document.content)
            if(!docType) throw HttpStatusError.unprocesableEntity(messages.docNotValid)
            const data = {
                id: uuid(),
                companyId,
                questionId: resp.questionId,
                name: resp.document.name,
                file: resp.document.content,
                type: docType.mime
            }
            documents.push(data)
        }
        const docs = await Documents.findAll({...opts, attributes: ['id', 'file']})
        await Promise.all(docs.map(async doc => {
            await s3Provider.delete(doc.file)
        }))
        const documentFormatted = await Promise.all(documents.map(async doc => {
            const key = `system3-${doc.id}-${doc.name}`
            const resource = s3Provider.base64ToBuffer(doc.file)
            await s3Provider.upload(key, resource, doc.type)
            return {...doc, file: key}
        }))
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



module.exports.get_quizzes_document_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const document = await Documents.findByPk(id)
    if(!document) throw HttpStatusError.notFound(messages.docNotFound)
    const {content} = await s3Provider.download(document.file, false)
    const type = await s3Provider.getFileType(content)
    const stream = Readable.from(content)
    res.setHeader('Content-Type', type.mime)
    res.setHeader('Content-Disposition', `attachment; filename="${document.name}"`)
    stream.pipe(res)
})
