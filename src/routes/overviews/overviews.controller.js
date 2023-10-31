
const { controllerWrapper } = require('../../utils/common')
const { ViewRiskScore, Quizzes, Companies, Alerts, Solutions, Users, Risks, Regulations, Sequelize } = require('../../database/models')
const { ALERT_STATE, SOLUTION_STATE } = require('../../database/constants')
const { topAlertsResponseData, topRisksResponseData } = require('./helper')
/**
 * Dashboard compliance score and the rest goes here...
 * Compliance Score
 * Number Solutions
 * Number Risks
 * Numebr Quizzes
 * Numebr Alerts
 * Top 10 Alerts
 * Top 10 Risks
 */
module.exports.get_overviews = controllerWrapper(async (req, res) => {
  const TOP_LIMIT = 10
  const {notIn} = Sequelize.Op
  const companyId = req.user.Company.id
  //GET RISK SCORE
  const riskScores = await ViewRiskScore.findAll({where: {companyId}})
  const totalSumRiskScore = riskScores.reduce((sum, curr) => sum + curr.riskScore, 0)
  const totalRiskScore = riskScores.length > 0 ? totalSumRiskScore/riskScores.length : 1
  const complianceScore = Number((1 - totalRiskScore).toFixed(2))
  //GET AFFECTING RISK COUNT
  const affectingRiskCount = riskScores.reduce((count, curr) => {
    if(curr.riskScore > 0.08) return count + 1
    return count
  }, 0)
  //GET PENDING QUIZ COUNT
  const company = await Companies.findByPk(companyId, {include: [Quizzes]})
  const quizIds = company.Quizzes ? company.Quizzes.map(quiz => quiz.id) : []
  const pendingQuizCount = await Quizzes.count({where: {id: {[notIn]: quizIds}}})
  //TODO: GET ACTIVE ALERT COUNT
  const pendingAlertCount = await Alerts.count({
    where: { state: ALERT_STATE.PENDING },
    include: {
      model: Users,
      where: {companyId},
      required: true,
      attributes: []
    }
  })
  //TODO: GET ACTIVE SOLUTION COUNT
  const activeSolutionCount = await Solutions.count({
    where: { state: SOLUTION_STATE.ACTIVE },
    include: {
      model: Users,
      as: 'MadeBy',
      where: {companyId},
      required: true,
      attributes: []
    }
  })

  //TODO: GET TOP 10 MOST URGENT ALERTS
  const topUrgentAlerts = await Alerts.findAll({
    where: { state: ALERT_STATE.PENDING },
    include: [
      {
        model: Users,
        where: {companyId},
        required: true,
        attributes: []
      },
      Regulations
    ],
    order: [['priority', 'DESC']],
    limit: TOP_LIMIT
  })

  //TODO: GET TOP 10 MOST URGENT RISKS
  const topUrgentRisks = await Risks.findAll({
    include: [
      {
        model: ViewRiskScore,
        where: {companyId},
        required: true,
      },
      Regulations
    ],
    order: [[ViewRiskScore,'riskScore','DESC']],
    limit: TOP_LIMIT
  })

  res.json({data: {
    complianceScore,
    pendingQuizCount,
    affectingRiskCount,
    alertCount: pendingAlertCount,
    solutionCount: activeSolutionCount,
    topAlerts: topUrgentAlerts.map(alert => topAlertsResponseData(alert)),
    topRisks: topUrgentRisks.map(risk => topRisksResponseData(risk))
  }})
})