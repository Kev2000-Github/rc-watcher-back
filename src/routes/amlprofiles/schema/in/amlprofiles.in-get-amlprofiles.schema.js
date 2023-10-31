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
        fullName: {type: 'string'},
        country: {type: 'string'}
      },
      required: ['fullName']
    },
    headers: {
      type: 'object'
    }
  }
}