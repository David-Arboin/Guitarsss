const express = require('express')
const router = express.Router()

//--Permet d'associer les controlers aux différentes routes
const userCtrl = require('../controllers/user')

router.post('/login', userCtrl.login)

module.exports = router
