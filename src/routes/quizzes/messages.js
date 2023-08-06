module.exports = {
    messages: {
        notFound: {
            code: 'quiz_NF',
            message: 'Quiz not found'
        },
        answerOutScope: {
            code: 'quiz_QE',
            message: 'there are answers outside the scope of this quiz'
        },
        missingAnswers: {
            code: 'quiz_MA',
            message: 'There are questions yet to be answered'
        },
        invalidAnswer: {
            code: 'quiz_IA',
            message: 'Received an invalid answer'
        },
        responseExcess: {
            code: 'quiz_RE',
            message: 'Received multiple answers for a question that does not support multiple answers'
        },
        documentMismatch: {
            code: 'quiz_DM',
            message: 'Received document for question that does not support documents'
        },
        documentQuantityMismatch: {
            code: 'quiz_DQM',
            message: 'number of documents received does not match quiz expected documents'
        }
    }
}