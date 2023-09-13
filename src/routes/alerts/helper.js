const { regulationResponseData } = require('../quizzes/helper')

const alertResponseData = (alert) => {
    return alert ? {
        id: alert.id,
        title: alert.title,
        description: alert.description,
        priority: alert.priority,
        state: alert.state,
        createBy: alert.createBy,
        Regulation: regulationResponseData(alert.Regulation),
    } : null
}

module.exports = {
    responseData: alertResponseData,
}