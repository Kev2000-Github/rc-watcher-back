const { Questions, Selections } = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { arrayToMap } = require('../../utils/common')
const {messages} = require('./messages')
const { SELECTION_TYPE } = require('../../database/constants')
const quizResponseData = (quiz) => {
    return quiz ? {
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        Regulation: regulationResponseData(quiz.Regulation),
        isCompleted: quiz.Users.length > 0,
        questionCount: quiz.Questions ? quiz.Questions.length : 0
    } : null
}

const quizFormResponseData = (quiz) => {
    return quiz ? {
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        Regulation: regulationResponseData(quiz.Regulation),
        Questions: quiz.Questions?.length ? 
            quiz.Questions.map(question => questionResponseData(question)) 
            : null
    } : null
}

const questionResponseData = (question) => {
    return question ? {
        id: question.id,
        description: question.description,
        hasDoc: question.hasDoc,
        isMultiple: question.isMultiple,
        Risk: riskResponseData(question.Risk),
        Selections: question.Selections? 
            question.Selections.map(selection => selectionResponseData(selection)) : null
    } : null
}

const selectionResponseData = (selection) => {
    return selection ? {
        id: selection.id,
        description: selection.description,
        riskScore: selection.riskScore,
        type: selection.type
    } : null
}

const riskResponseData = (risk) => {
    return risk ? {
        id: risk.id,
        name: risk.name
    } : null
}

const regulationResponseData = (regulation) => {
    return regulation ? {
        id: regulation.id,
        name: regulation.name,
        description: regulation.description,
    } : null
}

const validateQuizRequest = async (quizId, responses) => {
    const selections = await Selections.findAll({
        where: { id: responses.map(resp => resp.selectionId) },
        attributes: ['id', 'type']
    })
    const quizQuestions = await Questions.findAll({
        where: { quizId },
        attributes: ['id', 'hasDoc', 'isMultiple'],
        raw: true
    })
    const quizQuestionsId = quizQuestions.map(question => question.id)
    const quizQuestionsMap = arrayToMap(quizQuestionsId, {receivedAnswers: []})
    for(const resp of responses){
        const questionId = resp.questionId
        if(quizQuestionsMap[questionId]){
            const answers = quizQuestionsMap[questionId].receivedAnswers
            const selection = selections.find(selection => selection.id === resp.selectionId)
            if(!selection) throw HttpStatusError.badRequest(messages.invalidAnswer)
            const item = {
                ...resp,
                type: selection.type
            }
            quizQuestionsMap[questionId].receivedAnswers = [...answers, item]
        }
        else throw HttpStatusError.badRequest(messages.answerOutScope)
    }

    for(const {id, hasDoc, isMultiple} of quizQuestions){  
        //ALL QUESTIONS HAS ITS RESPECTIVE ANSWER
        const {receivedAnswers} = quizQuestionsMap[id]
        if(receivedAnswers.length === 0){
            throw HttpStatusError.badRequest(messages.missingAnswers)
        }
        //ONLY 1 ANSWER IF IT MULTIPLE IS NOT ALLOWED
        if(!isMultiple && receivedAnswers.length > 1){
            throw HttpStatusError.badRequest(messages.responseExcess)
        }

        //DOCUMENT VERIFICATION
        const documents = receivedAnswers.filter(ans => ans.document)
        if(!hasDoc && documents.length > 0){
            throw HttpStatusError.badRequest(messages.documentMismatch)
        }
        else if(hasDoc){
            for(const answer of receivedAnswers){
                if(answer.type === SELECTION_TYPE.NEGATIVE) continue
                if(documents.length === 0) throw HttpStatusError.badRequest(messages.documentQuantityMismatch)
            }
        }
    }
    return
}

module.exports = {
    responseData: quizResponseData,
    quizFormResponseData,
    validateQuizRequest
}