const express = require('express')
const bodyParser = require('body-parser')
const Postrouter = express.Router()
const controls = require('../controllers/post-controller')
const auth = require('../controllers/auth')


Postrouter.get('/', auth,controls.getAllPost)
Postrouter.post('/add',auth,controls.addposts)
Postrouter.get('/add',auth,controls.timeline)


module.exports = Postrouter;