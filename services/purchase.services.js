const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

exports.createPurchaseServices = async (data) => {
    const db = getDb();
    const result = await db.collection('purchase').insertOne(data);
    return result;
}
exports.getPurchaseServices = async (query) => {
    const db = getDb();
    const { email } = query;
    let result;
    if (email) {
        result = await db.collection('purchase').find({ email: email }).toArray();
    }
    else {
        result = await db.collection('purchase').find({}).toArray();
    }
    return result;
}
exports.getPurchaseByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('purchase').findOne({ _id: ObjectId(id) });
    return result;
}
exports.deletePurchaseByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('purchase').deleteOne({ _id: ObjectId(id) });
    return result;
}
exports.updatePurchaseByIdServices = async (id, data) => {
    const db = getDb();
    const result = await db.collection('purchase').updateOne(
        { _id: ObjectId(id) },
        {
            $set: {
                paid: true,
                transactionID: data.transactionID,
                status: data.status
            }
        }
    );
    const insertPayment = await db.collection('payment').insertOne(data)
    return result;
}
