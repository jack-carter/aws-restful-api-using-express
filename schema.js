// schema.js
//
// This file prescribes the validations to be applied to input parameters for each 
// HTTP method implemented by the associated Resource.
//
// The validation schemas for each HTTP method are prescribed according to: 
// https://express-validator.github.io/docs/schema-validation.html
//
// This file is kept separate, so that the actual runtime code kept in entity.js file
// remains focused on implementation of the HTTP method. All validation schemas for 
// the associated RESTful Resource are kept here, to aid in comprehensive understanding
// of what's expected.
//
// This organization also allows for changes to be made to the validation schema, without
// perturbing the runtime code that implements the HTTP method.

function REQUIRES(property) {
  return ['MUST contain value for', property].join(' ');
}

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
  }
};
