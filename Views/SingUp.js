const express = require('express')
const { handleSingUp } = require('../Controllers/Controller')
const router = express.Router()

router.post('/singup', handleSingUp)

module.exports = router