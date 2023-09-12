
const alertResponseData = (alert) => {
    return alert ? {
        id: alert.id,
        title: alert.title,
        description: alert.description,
        priority: alert.priority,
        state: alert.state,
        createBy: alert.createBy,
        Regulation: regulationResponseData(alert.Regulation),
    } : null
}

const regulationResponseData = (regulation) => {
    return regulation ? {
        id: regulation.id,
        name: regulation.name,
        description: regulation.description,
    } : null

}

module.exports = {
    responseData: alertResponseData,
    regulationResponseData,
}