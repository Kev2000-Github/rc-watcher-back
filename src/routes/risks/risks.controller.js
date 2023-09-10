
const { controllerWrapper } = require('../../utils/common')
const { ViewRiskScore, Risks, Regulations } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')

module.exports.get_risks = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const companyId = req.user.Company.id
    const opts = {
        include: [
            {
                model: ViewRiskScore,
                where: {companyId},
                required: true,
            },
            Regulations
        ],
        order: [[ViewRiskScore,'riskScore','DESC']],
        ...pagination
    }
    let risks = await paginate(Risks, opts)
    risks.data = risks.data.map(regulation => responseData(regulation))
    res.json({...risks})
})