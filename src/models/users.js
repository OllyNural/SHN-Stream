const { userData } = require('../data/users.json')

exports.getById = (id) => {
    const user = userData.find((user) => user.id === id)
    return user ? user : null;
}

exports.getStreamsById = (id) => {
    const user = userData.find((user) => user.id === id)
    return user ? user.streams : null
}
