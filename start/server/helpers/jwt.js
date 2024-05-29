const jwt = require('jsonwebtoken');
const secretKey = "inigaaman"

// encode / encrypt
const signToken = (payload) => {
    return jwt.sign(payload, secretKey)
}

// decode / decrypt
const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifyToken }