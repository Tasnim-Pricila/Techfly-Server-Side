const { getDb } = require("../utils/dbConnect");

const verifyAdmin = async (req, res, next) => {
    try {
        const db = getDb();
        const requesterEmail = req.user.email;
        const requester = await db.collection('users').findOne({ email: requesterEmail });
        if (requester.role === 'admin') {
            next();
        }
        else {
            res.status(403).send({
                status: 'fail',
                message: 'Forbidden Access'
            });
        }
    } catch (error) {
        res.status(401).send({
            status: "fail",
            message: error.message
        })
    }
}

module.exports = verifyAdmin;