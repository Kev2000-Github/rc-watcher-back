const { Users, Alerts, UserSolutions, Steps, Regulations } = require('../../database/models')
const { responseData: userResponseData } = require('../users/helper')
const { responseData: alertResponseData } = require('../alerts/helper')
const { SOLUTION_STATE } = require('../../database/constants')

const solutionResponseData = (solution) => {
    return solution ? {
        id: solution.id,
        title: solution.title,
        description: solution.description,
        CreatedBy: userResponseData(solution.MadeBy),
        Responsables: solution.Responsables ? solution.Responsables.map(responsable => userResponseData(responsable)):null,
        Alerts: solution.Alerts ? solution.Alerts.map(alert => alertResponseData(alert)): null,
        Steps: solution.Steps ? solution.Steps.map(step => stepResponseData(step)): null,
        state: solution.state,
        createdAt: solution.createdAt
    } : null
}

const stepResponseData = (step) => {
    return step ? {
        id: step.id,
        description: step.description
    } : null
}

const includeOpts = (companyId) => ({
    include: [
        Alerts,
        {
            association: 'Responsables',
            though: UserSolutions
        },
        {
            model: Users,
            required: true,
            where: {
                companyId: companyId
            },
            as: 'MadeBy'
        }
    ]
})

const detailedIncludeOpts = {
    include: [
        Steps,
        {
            model: Alerts,
            include: [
                Users,
                Regulations
            ]
        },
        {
            association: 'Responsables',
            though: UserSolutions,
        },
        {
            model: Users,
            as: 'MadeBy'
        }
    ]
}

const getSolutionsFilters = (queryURLs) => {
    const state = queryURLs.state
    if([SOLUTION_STATE.ACTIVE, SOLUTION_STATE.INACTIVE].includes(state)){
        return {where: {state}}
    }
    return {}
}

module.exports = {
    responseData: solutionResponseData,
    getSolutionsFilters,
    includeOpts,
    detailedIncludeOpts
}