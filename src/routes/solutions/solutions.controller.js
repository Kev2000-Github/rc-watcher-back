const { controllerWrapper } = require('../../utils/common')
const { Solutions } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const uuid = require('uuid').v4
const { includeOpts } = require('./helper')


module.exports.get_solutions = controllerWrapper(async (req, res) => {


    const pagination = req.pagination
    const options = { ...pagination }
    const solutions = await paginate(Solutions, options)
    res.json({ data: solutions })

})

module.exports.get_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const options = { ...includeOpts, where: { id } }
    const solution = await Solutions.findOne(options)
    if (!Solutions) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: responseData(solution) })
})



module.exports.post_solutions = controllerWrapper(async (req, res) => {
    const { title, description, createdBy,  state } = req.body
    const SolutionsId = uuid()

    const newSolution = await Solutions.create({
        id: SolutionsId,
        title,
        description,
        createdBy,
        state,
    })
    res.json({ data: responseData(newSolution) })
})

module.exports.delete_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const solutions = await Solutions.findOne({ where: { id }, ...includeOpts })
    if (!solutions) throw HttpStatusError.notFound(messages.notFound)
    await solutions.destroy()
    res.json({ data: responseData(solutions) })
})

module.exports.put_solutions_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description,createdBy, state } = req.body
    const solution = await Solutions.findOne({ where: { id }, ...includeOpts })
    if (!solution) throw HttpStatusError.notFound(messages.notFound)
    await solution.update({
        title,
        description,
        createdBy,
        state

    })
    res.json({ data: responseData(solution) })
})
