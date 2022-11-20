const jwt = require('jsonwebtoken');

module.exports.generateToken = (email) => {
    const payload = {email: email}
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: '1d'
    });

    return accessToken;
} 
