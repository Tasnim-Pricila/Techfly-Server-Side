const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require("stripe")(process.env.stripe_secret_key);
const jwt = require('jsonwebtoken');

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
        const paymentCollection = client.db('techfly').collection('payment');
        const userCollection = client.db('techfly').collection('users');

        // GET PARTS 
        app.get('/parts', async (req, res) => {
            const result = await partsCollection.find().toArray();
            res.send(result);
        })

        // GET PARTS BY ID 
        app.get('/parts/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await partsCollection.findOne(query);
            res.send(result);
        })

        // POST PARTS 
        app.post('/parts',verifyJWT, async (req, res) => {
            const product = req.body;
            const result = await partsCollection.insertOne(product);
            res.send(result);
        })

        // DELETE PARTS 
        app.delete('/parts/:id',verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await partsCollection.deleteOne(query);
            res.send(result);
        })

        // POST PURCHASING ITEMS 
        app.post('/purchase', async (req, res) => {
            const purchase = req.body;
            const result = await purchaseCollection.insertOne(purchase);
            res.send(result);
        })

        // GET PURCHASE BY EMAIL 
        app.get('/purchase',verifyJWT, async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await purchaseCollection.find(query).toArray();
            res.send(result);
        })

        // GET PURCHASE BY ID 
        app.get('/purchase/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await purchaseCollection.findOne(query);
            res.send(result);
        })

        // Update purchase 
        app.patch('/purchase/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const query = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    paid: true,
                    transactionID: payment.transactionId
                }
            }
            const updatePurchase = await purchaseCollection.updateOne(query, updatedDoc);
            const result = await paymentCollection.insertOne(payment)
            res.send(result)
        })

        // POST REVIEWS
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        // Payment 
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const order = req.body;
            const price = order.price;
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types : ['card']
            });
            res.send({clientSecret: paymentIntent.client_secret});
        });

        // Upsert User 
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const user = req.body;
            const options = { upsert: true };
            const updatedUser = {
                $set: user
            }
            const result = await userCollection.updateOne(filter, updatedUser, options);
            const accessToken = jwt.sign(filter, process.env.ACCESS_TOKEN,
                {
                    expiresIn: '1d'
                });
            res.send({result, accessToken});
        })
    }
    finally {

    }
    function verifyJWT(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({message:"Unauthorized Access"});
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).send({message: "Forbidden Access"});
            }
            req.decoded = decoded;
            next();
        })   
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log("Listening to port", port);
})