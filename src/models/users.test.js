jest.mock('../data/users.json', () => ({
    userData: [
        {
            "id": 5,
            "streams": [
                "streamId",
                "streamId"
            ]
        }
    ]
}))
const users = require('./users.js');

describe('getById', () => {
    it('Should return null for non-existent user', () => {
        const user = users.getById(1);
        expect(user).toBeNull();
    });

    it('Should return user for existing user', () => {
        const user = users.getById(5);
        expect(user.id).toBe(5);
    });
});

describe('getStreamsById', () => {
    it('Should return empty array for non-existent user', () => {
        const streams = users.getStreamsById(1);
        expect(streams).toBeNull();
    });
    
    // Never a case where user exists with an empty array

    it('Should return streams for existing user', () => {
        const streams = users.getStreamsById(5);
        expect(streams.length).toBe(2);
        expect(streams[0]).toBe("streamId");
    });
});
