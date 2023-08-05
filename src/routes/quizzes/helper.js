

const quizResponseData = (quiz) => {
    return quiz ? {
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        Regulation: regulationResponseData(quiz.Regulation),
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

module.exports = {
    responseData: quizResponseData,
    quizFormResponseData
}