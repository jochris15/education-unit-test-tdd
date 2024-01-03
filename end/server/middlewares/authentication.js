const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers // proses destruct token dari headers
        console.log(req.headers);

        if (!authorization) {
            throw new Error('Unauthorized')
        }

        const access_token = authorization.split(" ")[1] // proses split token karena ada "Bearer" di tokennya, kita cuman mau ambil hasil encodingnya aja

        const verified = verifyToken(access_token) // proses decode access_token
        console.log(verified);
        const user = await User.findByPk(verified.id)

        if (!user) {
            throw new Error('NotFound')
        }

        const { id, username, role } = verified

        req.loginInfo = {
            userId: id,
            username,
            role
        }

        next()
    } catch (err) {
        console.log(err);
        let status = 500
        let message = 'Internal Server Error'

        if (err.message == 'Unauthorized') {
            status = 401
            message = 'Please login first'
        }

        if (err.name == 'JsonWebTokenError') {
            status = 401
            message = 'Please login first'
        }

        if (err.message == 'NotFound') {
            status = 404
            message = 'Data not found'
        }

        res.status(status).json({ message })
    }
}

module.exports = authentication