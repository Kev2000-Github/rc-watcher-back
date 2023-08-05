

const quizResponseData = (quiz) => {
    return quiz ? {
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        Regulation: regulationResponseData(quiz.Regulation),
        questionCount: quiz.Questions ? quiz.Questions.length : 0
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
    responseData: quizResponseData
}