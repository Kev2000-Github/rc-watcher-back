const { regulationResponseData } = require('../quizzes/helper')

module.exports.topAlertsResponseData = (alert) => {
    return alert ? {
        id: alert.id,
        title: alert.title,
        priority: alert.priority,
        Regulation: regulationResponseData(alert.Regulation)
    } : null
}

module.exports.topRisksResponseData = (risk) => {
    return risk ? {
        id: risk.id,
        name: risk.name,
        score: risk.ViewRiskScore?.riskScore,
        Regulation: regulationResponseData(risk.Regulation)
    } : null
}