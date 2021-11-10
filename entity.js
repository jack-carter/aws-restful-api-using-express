// entity.js

const { checkSchema } = require('express-validator');
const { Router } = require('express');

const schema = require('./schema');

function CREATED(request, entity) { 
  return [request.path, entity.ID].join('/'); 
};

const entity = Router();

// we have a single export, which is the Router for the actions we've defined
exports = entity;

// define what we can do w/ the collection of Entities
entity.route('/')

    // how to create them using POST
    .post(checkSchema(schema.POST), (request, response) => {
        const inputs = request.body;
        
        // TODO: insert the entity into the database
        const entity = ...;
        
        // return the standard POST response
        res.setHeader('Location', CREATED(request, entity))
        res.status(201).end()
    })
    
    // how to GET them, including using any filters
    .get(checkSchema(schema.GET.list), (request, response) => {
        // TODO: parse the Query Parameters
        const filters = request.query[...];
        
        // TODO: retrieve from the database
        const list = ...;
        
        // TODO: also include any pagination support
        response.json(list);
    })

    // by default we'll respond w/ "405 Method Not Allowed" for anything we haven't defined
    .all((request, response) => {
        res.status(405).end()
    })
    
// now define what we can do w/ an individual Entity
resource.route('/:id')

    .get(checkSchema(schema.GET.single), (request, response) => {
        const id = request.params.id
        
        // TODO: retrieve it from the database
        const entity = ...;

        response.json(entity)
    })

    .put(checkSchema(schema.PUT), (request, response) => {
        const id = request.params.id
        const entity = request.body
        
        // TODO: do the database update

        // send the standard PUT response
        response.status(204).end()
    })

    .delete(checkSchema(schema.DELETE), (request, response) => {
        const id = request.param.id
        
        // TODO: delete the item from the database

        // send the standard DELETE response
        response.status(204).end()
    })

    // by default we'll respond w/ "405 Method Not Allowed" for anything we haven't defined
    .all((request, response) => {
        response.status(405).end()
    })
