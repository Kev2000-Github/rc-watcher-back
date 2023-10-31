module.exports = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'},
        companyId: {type: 'string'},
        password: {type: 'string'}
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