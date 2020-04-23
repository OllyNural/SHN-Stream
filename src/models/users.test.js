jest.mock('../data/users.json', () => ({
    userData: [
        {
            "id": 5,
            "streams": [
                "streamId"
            ]
        }
    ]
}))
const users = require('./users.js');

describe('Users Model', () => {
    it('getById - Should return null for non-existent user', () => {
        const user = users.getById(1)
        expect(user).toBeNull()
    });

    it('getById - Should return user for existing user', () => {
        const user = users.getById(5)
        console.log(user)
        expect(user.id).toBe(5)
    });
});
