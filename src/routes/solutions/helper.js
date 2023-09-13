const { Users, Alerts, UserSolutions, Steps, Regulations } = require('../../database/models')
const { responseData: userResponseData } = require('../users/helper')
const { responseData: alertResponseData } = require('../alerts/helper')

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

const includeOpts = {
    include: [
        Alerts,
        {
            association: 'Responsables',
            though: UserSolutions
        },
        {
            model: Users,
            as: 'MadeBy'
        }
    ]
}

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

module.exports = {
    responseData: solutionResponseData,
    includeOpts,
    detailedIncludeOpts
}