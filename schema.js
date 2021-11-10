// schemas/entity.js

function REQUIRES(property) {
  return ['MUST contain value for', property].join(' ');
}

// the validation schemas for each HTTP method according to 
// https://express-validator.github.io/docs/schema-validation.html
exports = {
  POST: {
    someProperty: { in: ['body'], errorMessage: REQUIRES('someProperty') },
    someOtherProperty: { in: ['body'], 
      optional: { 
        options: { 
          nullable: true 
        } 
      }
    }
  },
  
  PUT: {
    id: { in: ['params'], errorMessage: REQUIRES('id') },
    status: { in: ['query'],
      optional: { 
        options: { 
          nullable: true 
        } 
      }
    }
  },
  
  DELETE: {
    id: { in: ['params'], errorMessage: REQUIRES('id') },
  },
  
  // we have to distinguish between GET against the collection vs the individual
  GET: {
    list: {
      status: { in: ['query'],
        optional: { 
          options: { 
            nullable: true 
          } 
        }
      }
    },
    single: {
      id: { in: ['params'], errorMessage: REQUIRES('id') }
    }
  }
};
