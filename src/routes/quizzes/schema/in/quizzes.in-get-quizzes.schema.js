module.exports = {
  type: 'object',
  properties: {
    body: {
      type: 'object'
    },
    params: {
      type: 'object'
    },
    query: {
      type: 'object',
      properties: {
        state: {type: 'string'},
        tags: {type: 'string'},
        page: {type: 'string'},
        limit: {type: 'string'}
      }
    },
    headers: {
      type: 'object'
    }
  }
}
  