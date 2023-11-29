const express = require('express')
const app = express()
const { Patient, User } = require('./models')
const authentication = require('./middlewares/authentication')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Endpoint
app.post('/register', async (req, res, next) => {
    try {
        const { username, password, role } = req.body
        const user = await User.create({ username, password, role })

        res.status(201).json({
            message: 'New user has been registered'
        })
    } catch (error) {
        let status = 500
        let message = 'Internal Server Error'
        if (error.name == 'SequelizeValidationError') {
            status = 400
            message = error.errors[0].message
        }

        if (error.name == 'SequelizeDatabaseError') {
            status = 400
            message = 'Invalid Data type'
        }

        res.status(status).json({
            message
        })
    }
})

app.use(authentication)

app.get('/patients', async (req, res, next) => {
    try {
        const patients = await Patient.findAll()

        res.status(200).json({
            message: "Succed read data patients",
            patients
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = app