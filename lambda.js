// lambda.js

const REST = require('serverless-http');
const express = require('express')
const api = express()

api.set('json replacer',null)
api.set('json spaces', 2)

api.use(express.urlencoded({ extended: true }))
api.use(express.json())

// now add as many Entities as this Lambda will be handling
api.use('/entity', require('./entities/entity'));

exports.handler = REST(api);
