const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({
                status: "fail",
                message: "Unauthorized Access",
            })
        }
        const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({
            status: "fail",
            message: "Invalid token",
            error: error.message
        })
    }
}
module.exports = verifyJWT;
