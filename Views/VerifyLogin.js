const express = require('express')
const { VerifyUserAuth } = require('../middleWares/Auth')
const router = express.Router()

router.get('/verifyLogin', VerifyUserAuth, (req, res) => {
    try {
        res.json({
            success: true,
            message: 'User is login'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message ||'Internal Server Error'
        })
    }
})

module.exports = router