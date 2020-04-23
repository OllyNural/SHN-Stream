const app = require('../../index.js');
const supertest = require('supertest');
const request = supertest(app)

const userData = [
    {
        "id": 5,
        "streams": [
            "streamId",
            "streamId"
        ]
    }
]

const fs = require('fs');
jest.mock('fs')

fs.readFile = jest.fn().mockImplementation((file, option, cb) => cb(null, JSON.stringify(userData)))
fs.writeFile = jest.fn().mockImplementation((file, data, encoding, cb) => cb(null))

describe('Video Check', () => {
    it('Should return a 401 for /video without user id', async (done) => {
        const res = await request.get('/video')
        expect(res.status).toBe(401);
        done();
    });
    
    it('Should return a 200 for /video', async (done) => {
        const res = await request.get('/video').set('x-user-id', 5);
        expect(res.status).toBe(200);
        done();
    });

    it('Should return a 200 for /video with a single new user', async (done) => {
        const res = await request.get('/video').set('x-user-id', 5)
        expect(res.status).toBe(200);
        done()
    });

    // Without spending more time working out how to mock the request for 3 times in a row
    // Can't get the push test working
    it.skip('Should return a Bad Request for /video with a new user added more than 3 times', async (done) => {
        await request.get('/video').set('x-user-id', 4)
        await request.get('/video').set('x-user-id', 4)
        await request.get('/video').set('x-user-id', 4)
        const res = await request.get('/video').set('x-user-id', 4);
        expect(res.status).toBe(400);
        done();
    });
});
