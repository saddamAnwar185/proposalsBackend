const express = require('express')
const { VerifyUserAuth } = require('../middleWares/Auth')
const { handleDeleteProject } = require('../Controllers/Controller')
const router = express.Router()

router.delete('/deleteProject/:id', VerifyUserAuth, handleDeleteProject)

module.exports = router