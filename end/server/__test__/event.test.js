const request = require('supertest') // seperti axios
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { hash } = require('../helpers/bcrypt')
const { sequelize } = require('../models')

let access_token;
beforeAll(async () => {
    //seeding users
    const users = require('../data/users.json')
    users.forEach(el => {
        el.password = hash(el.password)
        el.updatedAt = el.createdAt = new Date()
    })

    //seeding games
    const games = require('../data/games.json')
    games.forEach(el => {
        el.updatedAt = el.createdAt = new Date()
    })

    //seeding events
    const events = require('../data/events.json')
    events.forEach(el => {
        el.updatedAt = el.createdAt = new Date()
    })

    await sequelize.queryInterface.bulkInsert('Users', users, {})
    await sequelize.queryInterface.bulkInsert('Games', games, {})
    await sequelize.queryInterface.bulkInsert('Events', events, {})

    // access token
    const payload = {
        id: 1,
        email: 'user1@mail.com',
        role: 'admin'
    }

    access_token = signToken(payload)
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await sequelize.queryInterface.bulkDelete('Games', null, { truncate: true, cascade: true, restartIdentity: true })
    await sequelize.queryInterface.bulkDelete('Events', null, { truncate: true, cascade: true, restartIdentity: true })
})


// .set => untuk ngeset headers
describe('GET /events', () => {
    describe('GET /events - succeed', () => {
        it('should be return of array of object instance data events', async () => {
            const response = await request(app)
                .get('/events')
                .set('Authorization', `Bearer ${access_token}`)

            expect(response.status).toBe(200) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', 'Succeed read events')
            expect(response.body).toHaveProperty('events', expect.any(Array))
            expect(response.body.events.length).toBeGreaterThan(0)
        })
    })

    describe('GET /events - fail', () => {
        // error kalo belom login / gaada token
        it('should be return an object with error message', async () => {
            const response = await request(app)
                .get('/events')

            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
        })

        // error kalo tokennya salah
        it('should be return an object with error message', async () => {
            const response = await request(app)
                .get('/events')
                .set('Authorization', `Bearer blablabla`)

            expect(response.status).toBe(401) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
})