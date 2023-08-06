module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                responses: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            questionId: {type: 'string', format: 'uuid'},
                            selectionId: {type: 'string', format: 'uuid'},
                            document: {type: 'string'}
                        }
                    }
                },
            }
        },
        params: {
            type: 'object'
        },
        query: {
            type: 'object'
        },
        headers: {
            type: 'object'
        }
    }
}
  