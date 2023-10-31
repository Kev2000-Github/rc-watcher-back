module.exports = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            fullName: {
              type: 'string',
              format: 'fullName',
              errorMessage: {
                format: 'should not have numbers nor special characters nor trailing spaces'
              }
            },
            username: {
              type: 'string',
              format: 'username',
              errorMessage: {
                format: 'can\'t have blank spaces in the username'
              }
            },
            email: {
              type: 'string',
              format: 'email',
              errorMessage: {
                format: 'is not in a valid format'
              }
            },
            password: {
              type: 'string',
              format: 'password',
              errorMessage: {
                format: 'must have 8 characters, uppercase, lowercase, alphanumerical and special characters'
              }
            },
          }
        },
        company: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            companyId: {
              type: 'string',
              format: 'username',
              errorMessage: {
                format: 'can\'t have blank spaces in the companyId'
              }
            },
            countryId: {
              type: 'string',
              format: 'uuid',
              errorMessage: {
                format: 'format is invalid'
              }
            },
            address: {
              type: 'string'
            }
          }
        }
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