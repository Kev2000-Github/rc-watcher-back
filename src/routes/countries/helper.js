

module.exports.responseData = (country) => {
    return country ? {
        id: country.id,
        name: country.name
    } : null
}