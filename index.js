const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Techfly Server");
})


const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.8mwz4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const partsCollection = client.db('techfly').collection('parts');
        const purchaseCollection = client.db('techfly').collection('purchase');
        const reviewCollection = client.db('techfly').collection('reviews');

        // GET PARTS 
        app.get('/parts', async (req, res) => {
            const result = await partsCollection.find().toArray();
            res.send(result);
        })

        // GET PARTS BY ID 
        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : ObjectId(id)};
            const result = await partsCollection.findOne(query);
            res.send(result);
        })

        // POST PARTS 
        app.post('/parts', async (req, res) => {
            const product = req.body;
            const result = await partsCollection.insertOne(product);
            res.send(result);
        })

        // DELETE PARTS 
        app.delete('/parts/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await partsCollection.deleteOne(query);
            res.send(result);
        })

        // POST PURCHASING ITEMS 
        app.post('/purchase', async (req,res) => {
            const purchase = req.body;
            const result = await purchaseCollection.insertOne(purchase);
            res.send(result);
        })

        // GET PURCHASE BY EMAIL 
        app.get('/purchase', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await purchaseCollection.find(query).toArray();
            res.send(result);
        })

        // GET PURCHASE BY ID 
        app.get('/purchase/:id', async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) };
            const result = await purchaseCollection.findOne(query);
            res.send(result);
        })


        // POST REVIEWS
        app.post('/review', async (req,res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log("Listening to port", port);
})