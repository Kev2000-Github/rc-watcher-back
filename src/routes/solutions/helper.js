const solutionResponseData = (solution) => {
    return solution ? {
        id: solution.id,
        title: solution.title,
        description: solution.description,
        createBy: solution.createBy,
        state: solution.state,
    } : null
}

module.exports = {
    responseData: solutionResponseData,
}