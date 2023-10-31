

module.exports.responseData = (role) => {
  return role ? {
    id: role.id,
    name: role.name
  } : null
}