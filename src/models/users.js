const { userData } = require('../data/users.json')
const fs = require('fs');
const path = require('path')

// exports.getById = (id) => {
//     const user = userData.find((user) => user.id === id)
//     return user ? user : null;
// }

exports.getStreamsByIdJson = (id) => {
    return new Promise((res, rej) => {
        fs.readFile(path.resolve(__dirname, '../data/users.json'), 'utf8', (err, data) => {
            if (err) {
                rej(err)
            }
            const userData = JSON.parse(data)
            const user = userData.find((user) => user.id == id)
            res(user ? user.streams : [])
        });
    })
}

exports.addStreamToUserId = (id) => {
    const filePath = '../data/users.json'
    return new Promise((res, rej) => {
        fs.readFile(path.resolve(__dirname, filePath), 'utf8', (err, data) => {
            if (err) {
                rej(err);
            }
            const userData = JSON.parse(data)

            const i = userData.findIndex(user => user.id === id)
            if (i > -1) {
                console.log(i)
                userData[i].streams.push("streamId")
            }
            else userData.push({
                id,
                streams: ["streamId"]
            })

            fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(userData), 'utf8', (err) => {
                if (err) {
                    rej(err);
                }
    
                res();
            });
        });
    })
}