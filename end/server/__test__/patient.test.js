const request = require('supertest') // seperti axios
const app = require('../app')
const { createToken } = require('../helpers/jwt')
const { sequelize } = require('../models')

let access_token;
beforeAll(async () => {
    //seeding patients
    const patients = require('../data/patients.json').map((patient) => {
        patient.createdAt = new Date()
        patient.updatedAt = new Date()
        return patient
    })

    for (let i = 0; i < patients.length; i++) {
        const patientData = patients[i]

        const users = await sequelize.queryInterface.bulkInsert('Users', [{
            username: patientData.username,
            password: patientData.password,
            role: 'Patient',
            createdAt: new Date(),
            updatedAt: new Date()
        }], { returning: true })

        await sequelize.queryInterface.bulkInsert('Patients', [{
            fullname: patientData.fullname,
            userId: users[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    }

    // access token
    const payload = {
        id: 1,
        username: 'Test',
        role: 'Patient'
    }

    access_token = createToken(payload)
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await sequelize.queryInterface.bulkDelete('Patients', null, { truncate: true, cascade: true, restartIdentity: true })
})


// .set => untuk ngeset headers
describe('GET /patients', () => {
    describe('GET /patients - succeed', () => {
        it('should be return of array of object instance data patients', async () => {
            const response = await request(app).get('/patients').set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(200) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', 'Succed read data patients')
            expect(response.body).toHaveProperty('patients', expect.any(Array))
            expect(response.body.patients.length).toBeGreaterThan(0)
        })
    })
})