const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

exports.createPartServices = async (data) => {
    const db = getDb();
    const result = await db.collection('parts').insertOne(data);
    return result;
}
exports.getPartServices = async () => {
    const db = getDb();
    result = await db.collection('parts').find({}).toArray();
    return result;
}
exports.getPartByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('parts').findOne({ _id: ObjectId(id) });
    return result;
}
exports.deletePartByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('parts').deleteOne({ _id: ObjectId(id) });
    return result;
}