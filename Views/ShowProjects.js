const express = require('express')
const { VerifyUserAuth } = require('../middleWares/Auth')
const { handleShowProjects } = require('../Controllers/Controller')
const router = express.Router()

router.get('/showProjects/:id', VerifyUserAuth, handleShowProjects)

module.exports = router