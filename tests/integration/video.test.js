const app = require('../../index.js');
const supertest = require('supertest');
const request = supertest(app)

describe('Health Check', () => {
    it('Should return a 200 for /health', async (done) => {
        const res = await request.get('/video');
        expect(res.status).toBe(200);
        done();
    });
});
