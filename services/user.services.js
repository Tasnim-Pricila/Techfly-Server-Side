const { getDb } = require("../utils/dbConnect");
const { generateToken } = require("../utils/token");

exports.getUserServices = async (query) => {
    const db = getDb();
    const result = await db.collection('users').find({}).toArray();
    return result;
}
exports.getUserByEmailServices = async (email) => {
    const db = getDb();
    const result = await db.collection('users').findOne({ email: email });
    return result;
}
exports.updateUserByEmailServices = async (email, user) => {
    const db = getDb();
    const result = await db.collection('users').updateOne(
        { email: email },
        {
            $set: {
                name: user.name,
                phone: user.phone,
                education: user.education,
                city: user.city,
                district: user.district,
                linkedIn: user.linkedIn,
                address: user.address
            }
        }
    );
    return result;
}
exports.makeAdminServices = async (email) => {
    const db = getDb();
    const result = await db.collection('users').updateOne(
        { email: email },
        {
            $set: {
                role: 'admin'
            }
        }
    );
    return result;
}
exports.adminOrNotServices = async (email) => {
    const db = getDb();
    const user = await db.collection('users').findOne({ email: email });
    const isAdmin = await user?.role === 'admin';
    return isAdmin;
}
exports.upsertUserByEmailServices = async (email, user) => {
    const db = getDb();
    const result = await db.collection('users').updateOne(
        { email: email },
        {
            $set: user
        },
        { upsert: true }
    );
    const accessToken = generateToken(email);
    // console.log(result, accessToken, email)
    return { result, accessToken };
}