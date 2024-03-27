const request = require('supertest') // seperti axios
const app = require('../app')

// .send = untuk ngirim body
describe('POST /register', () => {
    describe('POST /register - succeed', () => {
        it('should be return an object with message', async () => {
            const body = { username: 'test', password: '12345', role: 'Patient' }
            const response = await request(app).post('/register').send(body)

            expect(response.status).toBe(201) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', 'New user has been registered')
        })
    })

    describe('POST /register - error', () => {
        it('should be return an object with error message', async () => {
            const body = { username: '', password: '12345', role: 'Patient' }
            const response = await request(app).post('/register').send(body)

            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
        })

        it('should be return an object with error message', async () => {
            const body = { username: 'test', password: '', role: 'Patient' }
            const response = await request(app).post('/register').send(body)

            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
            console.log(response.body);
        })

        it('should be return an object with error message', async () => {
            const body = { username: 'test', password: '12345', role: null }
            const response = await request(app).post('/register').send(body)

            expect(response.status).toBe(400) // testing untuk codenya
            expect(response.body).toBeInstanceOf(Object) // testing untuk isinya
            expect(response.body).toHaveProperty('message', expect.any(String))
            console.log(response.body);
        })
    })
})