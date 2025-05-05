const express = require('express')
const { handleAddProjectPost } = require('../Controllers/Controller')
const { VerifyUserAuth } = require('../middleWares/Auth')
const router = express.Router()

router.post('/addProject', VerifyUserAuth ,handleAddProjectPost )

module.exports = router