const { controllerWrapper } = require('../../utils/common')
const { Solutions, Steps, sequelize } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData, getSolutionsFilters } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const uuid = require('uuid').v4
const { includeOpts, detailedIncludeOpts } = require('./helper')

module.exports.get_solutions = controllerWrapper(async (req, res) => {
    const filterOpts = getSolutionsFilters(req.query)
    const pagination = req.pagination
    const options = { ...filterOpts, ...pagination, ...includeOpts }
    const solutions = await paginate(Solutions, options)
    solutions.data = solutions.data.map(solution => responseData(solution))
    res.json(solutions)
})

module.exports.get_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const options = { ...detailedIncludeOpts, where: { id } }
    const solution = await Solutions.findOne(options)
    if (!solution) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: responseData(solution) })
})

module.exports.post_solutions = controllerWrapper(async (req, res) => {
    const { title, description, steps = [], responsableIds = [], alertIds = [] } = req.body
    const createdBy = req.user.id
    const solutionId = uuid()

    await sequelize.transaction(async transaction => {
        const newSolution = await Solutions.create({
            id: solutionId,
            title,
            description,
            createdBy,
        }, {transaction})
        const stepInputs = steps.map(step => ({
            id: uuid(),
            solutionId,
            description: step
        }))
        await Steps.bulkCreate(stepInputs, {transaction})
        await newSolution.setResponsables(responsableIds, {transaction})
        await newSolution.setAlerts(alertIds, {transaction})
    })
    const solution = await Solutions.findByPk(solutionId, includeOpts)
    res.json({ data: responseData(solution) })
})

module.exports.delete_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const solutions = await Solutions.findOne({ where: { id }, ...includeOpts })
    if (!solutions) throw HttpStatusError.notFound(messages.notFound)
    return sequelize.transaction(async transaction => {
        await Steps.destroy({where: {solutionId: id}, transaction})
        solutions.setResponsables([], {transaction})
        await solutions.destroy({transaction})
        res.json({ data: responseData(solutions) })    
    })
})

module.exports.put_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description, state, steps, responsableIds } = req.body
    let solution = await Solutions.findByPk(id)
    if (!solution) throw HttpStatusError.notFound(messages.notFound)
    await sequelize.transaction(async transaction => {
        await solution.update({
            title,
            description,
            state
        })
        if(steps){
            await Steps.destroy({where: {solutionId: id}, transaction})
            const stepInputs = steps.map(step => ({
                id: uuid(),
                solutionId: id,
                description: step
            }))
            await Steps.bulkCreate(stepInputs, {transaction})
        }
        if(responsableIds){
            await solution.setResponsables(responsableIds, {transaction})
        }
    })
    solution = await Solutions.findByPk(id, includeOpts)
    res.json({ data: responseData(solution) })
})
