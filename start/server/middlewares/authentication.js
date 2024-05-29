const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw { name: "Unauthorized" }

        const access_token = authorization.split(' ')[1]

        const payload = verifyToken(access_token)

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })

        if (!user) throw { name: "Unauthorized" }

        req.loginInfo = {
            userId: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (err) {
        let status = 500
        let message = 'Internal Server Error'

        if (err.name == 'Unauthorized' || err.name == 'JsonWebTokenError') {
            message = 'Please login first'
            status = 401
        }

        res.status(status).json({
            message
        })
    }
}

module.exports = authentication