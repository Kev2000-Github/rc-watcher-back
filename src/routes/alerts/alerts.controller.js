const { controllerWrapper } = require('../../utils/common')
const { Alerts } = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const uuid = require('uuid').v4
const { includeOpts } = require('./helper')

module.exports.get_alerts = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const options = { ...pagination, ...includeOpts }
    let alerts = await paginate(Alerts, options)
    alerts.data = alerts.data.map(alert => responseData(alert))

    res.json({ ...alerts })
})

module.exports.get_alerts_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const options = { ...includeOpts, where: { id } }
    const alert = await Alerts.findOne(options)
    if (!alert) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: responseData(alert) })
})

module.exports.post_alerts = controllerWrapper(async (req, res) => {
    const { title, description, priority, regulationId } = req.body
    const createdBy = req.user.id
    const alertId = uuid()

    const newAlert = await Alerts.create({
        id: alertId,
        title,
        description,
        priority,
        createdBy,
        regulationId,
    })
    res.json({ data: responseData(newAlert) })
})

module.exports.put_alerts_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description, priority, createdBy, regulationId, state } = req.body
    const alert = await Alerts.findOne({ where: { id }, ...includeOpts })
    if (!alert) throw HttpStatusError.notFound(messages.notFound)
    await alert.update({
        title,
        description,
        priority,
        state,
        createdBy,
        regulationId
    })
    res.json({ data: responseData(alert) })
})

module.exports.delete_alerts_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const alert = await Alerts.findOne({ where: { id }, ...includeOpts })
    if (!alert) throw HttpStatusError.notFound(messages.notFound)
    await alert.destroy()
    res.json({ data: responseData(alert) })
})
