const { MongoClient } = require("mongodb");
const connectionString = process.env.DATABASE;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnect;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnect = db.db("techfly");
      console.log("Successfully connected to MongoDB");

      return callback();
    });
  },

  getDb: function () {
    return dbConnect;
  },
};