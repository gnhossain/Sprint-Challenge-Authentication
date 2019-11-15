const { sign } = require('jsonwebtoken');
const { jwtSecret } = require('./secrets.js');

module.exports = {
    generateToken
}

function generateToken({ id, username }){
    const payload = {
        subject: id,
        username: username,
    }
    const options = {
        expiresion:'2h'
    }

    return sign(payload, jwtSecret,options)
}