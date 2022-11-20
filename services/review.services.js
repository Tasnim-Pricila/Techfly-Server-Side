const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

exports.createReviewServices = async (data) => {
    const db = getDb();
    const result = await db.collection('reviews').insertOne(data);
    return result;
}
exports.getReviewServices = async (query) => {
    const db = getDb();
    const result = await db.collection('reviews').find({}).toArray();
    return result;
}