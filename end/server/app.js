const express = require('express')
const app = express()

const authentication = require('./middlewares/authentication')
const { User, Event } = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.create({ email, password, role: "staff" })

        res.status(201).json({
            message: "Succeed register new user",
            user: {
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        let status = 500
        let message = 'Internal Server Error'

        if (err.name == 'SequelizeValidationError') {
            status = 400
            message = err.errors[0].message
        }

        res.status(status).json({
            message
        })
    }
})

app.use(authentication)

app.get('/events', async (req, res, next) => {
    try {
        const events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            message: "Succeed read events",
            events
        })
    } catch (err) {
        let status = 500
        let message = 'Internal Server Error'

        res.status(status).json({
            message
        })
    }
})

module.exports = app