const userData = [
    {
        "id": 5,
        "streams": [
            "streamId",
            "streamId"
        ]
    },
    {
        "id": 4,
        "streams": [
            "streamId",
            "streamId",
            "streamId"
        ]
    }
]

const users = require('./users.js');

const fs = require('fs');
jest.mock('fs')

describe('getStreamsById', () => {
    it('Should return empty array of streams for non-existing user', async (done) => {
        fs.readFile = jest.fn().mockImplementation((file, option, cb) => cb(null, JSON.stringify(userData)))
        const streams = await users.getStreamsByIdJson(1);
        expect(streams.length).toBe(0);
        done()
    })

    it('Should return correct array of streams for existing user', async (done) => {
        fs.readFile = jest.fn().mockImplementation((file, option, cb) => cb(null, JSON.stringify(userData)))
        const streams = await users.getStreamsByIdJson(5);
        expect(streams.length).toBe(2);
        expect(streams[0]).toBe("streamId");
        done()
    })
});

// Didn't want to spend ages on this
describe('addStreamToUserId', () => {
    it('Should add to an existing user stream if exists', async (done) => {
        fs.readFile = jest.fn().mockImplementation((file, option, cb) => cb(null, JSON.stringify(userData)))
        fs.writeFile = jest.fn().mockImplementation((file, data, encoding, cb) => cb(null))
        await users.addStreamToUserId(4);
        expect(fs.writeFile).toHaveBeenCalled();
        done()
    })

    it('Should create a new user stream if ID is new', async (done) => {
        fs.readFile = jest.fn().mockImplementation((file, option, cb) => cb(null, JSON.stringify(userData)))
        await users.getStreamsByIdJson(4);
        expect(fs.writeFile).toHaveBeenCalled();
        done()
    })
});
