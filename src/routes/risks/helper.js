const { regulationResponseData } = require('../quizzes/helper')

module.exports.responseData = (risk) => {
    return risk ? {
        id: risk.id,
        name: risk.name,
        score: risk.ViewRiskScore?.riskScore,
        Regulation: regulationResponseData(risk.Regulation)
    } : null
}