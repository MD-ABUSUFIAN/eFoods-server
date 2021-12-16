const express=require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const cors=require('cors');
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0epdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)



async function run(){

    try{
        await client.connect();
        const database = client.db("eFoods");
    const foodsCollection = database.collection("foodItem");

// e-Foods All POST Method Section

app.post('/foodsItem',async(req,res)=>{
    const item=req.body;
    const result= await foodsCollection.insertOne(item)
    res.json(result);
    console.log(result)

})
// e-Foods All POST Method Section

    app.get('/foodsItem',async(req,res)=>{
        const result=await foodsCollection.find({}).toArray()
        res.json(result)
        console.log(result)
    })



    }
    finally{
        // await client.close();
    }
}
 run().catch(console.dir)





app.get('/',(req,res)=>{
    res.send("Server site connect")
});

app.listen(port,()=>{
    console.log("Server site listen",port)
})