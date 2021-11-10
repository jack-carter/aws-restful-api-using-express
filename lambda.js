// lambda.js
//
// this is the boiler-plate code every Lambda that's serving an Express API will use,
// whether for one RESTful Resource, or many.

const REST = require('serverless-http');
const express = require('express')
const api = express()

api.set('json replacer',null)
api.set('json spaces', 2)

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

// now add as many Entities as this Lambda will be handling
api.use('/entity', require('./entity'));

exports.handler = REST(api);
