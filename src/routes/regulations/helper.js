

module.exports.responseData = (regulation) => {
  return regulation ? {
    id: regulation.id,
    name: regulation.name,
    description: regulation.description
  } : null
}