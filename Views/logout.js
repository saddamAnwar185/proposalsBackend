const express = require('express')
const { VerifyUserAuth } = require('../middleWares/Auth')
const { handleLogout } = require('../Controllers/Controller')
const router = express.Router()

router.get('/logout', VerifyUserAuth, handleLogout)

module.exports = router