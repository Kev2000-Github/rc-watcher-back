const { ALERT_STATE, ALERT_PRIORITY } = require('../../database/constants')
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

const includeOpts = (companyId) => ({
    include: [{
        model: Users,
        required: true,
        where: {companyId}
    }, Regulations]
})

const getAlertsFilter = (queryURLs) => {
    const state = queryURLs.state
    const priority = queryURLs.priority
    const where = {}
    if([ALERT_STATE.SOLVED, ALERT_STATE.PENDING, ALERT_STATE.CANCELED].includes(state)){
        where['state'] = state
    }
    if([ALERT_PRIORITY.HIGH, ALERT_PRIORITY.MEDIUM, ALERT_PRIORITY.LOW].includes(priority)){
        where['priority'] = priority
    }
    return {where}
}

module.exports = {
    responseData: alertResponseData,
    getAlertsFilter,
    includeOpts
}