const { Users, Regulations } = require('../../database/models')
const { regulationResponseData } = require('../quizzes/helper')
const { responseData: userResponseData } = require('../users/helper')

const alertResponseData = (alert) => {
    return alert ? {
        id: alert.id,
        title: alert.title,
        description: alert.description,
        priority: alert.priority,
        state: alert.state,
        CreatedBy: userResponseData(alert.User),
        Regulation: regulationResponseData(alert.Regulation),
    } : null
}

const includeOpts = {
    include: [Users, Regulations]
}

module.exports = {
    responseData: alertResponseData,
    includeOpts
}