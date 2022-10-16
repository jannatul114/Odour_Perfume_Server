const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
dotenv.config()
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhaxpnf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {
        await client.connect();
        const productCollection = client.db("ProductCollection").collection("products");

        // app.get('/products', (req, res) => {
        //     const query = {};
        //     const result = productCollection.find(query).toArray;
        //     res.send(result)
        // })

        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query)
            res.send(result);
        })

        // const user = { name: "Mithila", email: "jfmithila114@gmail.com" }
        // const result = await productCollection.insertOne(user);
        // console.log('User inserted with id : ', insertedId);
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('hello odour hello hello!!')
})

// app.get('/user/:id', (req, res) => {
//     console.log(req.params);
//     const id = parseInt(req.params.id);
//     const user = users.find(u => u.id === id);
//     res.send(user);
// })

app.listen(port, () => {
    console.log('listening to port', port)
});