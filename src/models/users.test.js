const userData = [
    {
        "id": 5,
        "streams": [
            "streamId",
            "streamId"
        ]
    }
]

// const mock = require('mock-fs');

// jest.mock('../data/users.json', () => ({
//     userData: [
//         {
//             "id": 5,
//             "streams": [
//                 "streamId",
//                 "streamId"
//             ]
//         }
//     ]
// }))
const users = require('./users.js');

const fs = require('fs');
jest.mock('fs')

describe('getById', () => {
    // it('Should return null for non-existent user', () => {
    //     const user = users.getById(1);
    //     expect(user).toBeNull();
    // });

    // it('Should return user for existing user', () => {
    //     const user = users.getById(5);
    //     expect(user.id).toBe(5);
    // });
});

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
