require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest')
const app = require('../server')


describe('Post Endpoints', () => {
    it('should create a new User', () => {
        let post = {
            firstName: "moe",
            lastName: "szyslak",
            username: "moe",
            password: "carv77",
            role: "user",
            idCampus: 1
        };
        const res = request(app)
            .post('/users/register')
            .send(post)
        expect(res._data).toEqual(post)
    })

    it('should authenticate a User', () => {
        let post = {
            username: "candres",
            password: "carv77"
        };

        const res = request(app)
            .post('/users/authenticate')
            .send(post)
        expect(res._data).toEqual(post)
        expect(res.method).toEqual("POST")
    })

    it('should fetch all User', async() => {
        const res = request(app).get('/users');
        res.then(value => {;
            expect(value.statusCode).toEqual(401)
            expect(value.text).toEqual('{"message":"Unauthorized"}')
        })
        expect(res.method).toEqual("GET")
    });
})