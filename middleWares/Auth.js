const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const setUser = (loginUser) => {
    const payload = {
        name: loginUser.name,
        email: loginUser.email,
        password: loginUser.password
    }

    const token = jwt.sign(payload, secret)

    return token
}

const VerifyUserAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.json({
            success: false,
            message: 'Login First'
        });
    }

    const isVerifed = jwt.verify(token, secret);

    if (isVerifed) {
        next();
    } else {
        res.json({
            success: false,
            message: 'You are not authenticated'
        });
    }
}



module.exports = {
    setUser,
    VerifyUserAuth
}