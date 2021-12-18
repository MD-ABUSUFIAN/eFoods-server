const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const orderCollection = database.collection("Order");
        const reviewCollection = database.collection("Review");

// e-Foods All POST Method Section


// FOOD item post method
app.post('/foodsItem',async(req,res)=>{
    const item=req.body;
    const result= await foodsCollection.insertOne(item)
    res.json(result);


})

// FOOD item confirm Order method
app.post('/confirmOrder',async(req,res)=>{
    const item=req.body;
    const result= await orderCollection.insertOne(item)
    res.json(result);
    console.log(result)

})

// Customer Review POST method
app.post('/customerReview',async(req,res)=>{
    const item=req.body;
    const result= await reviewCollection.insertOne(item)
    res.json(result);
    console.log(result)

})






// e-Foods All GET Method Section


//  All Food Item Get Method Part

    app.get('/foodsItem',async(req,res)=>{
        const result=await foodsCollection.find({}).toArray()
        res.json(result)
       
    })

     //  All Food Orders Get Method Part

    app.get('/allOrder',async(req,res)=>{
        const result=await orderCollection.find({}).toArray()
        res.json(result)
       
    })
    //  All My Orders Get Method Part
    app.get('/myOrders',async(req,res)=>{
        const email = req.query.email;
        console.log(email)
        const query = {email:email};
        console.log(query)
        const result=await orderCollection.find(query).toArray()
        res.json(result)
        console.log(result)
       
    })




//  All Breakfast Item Get Method Part
app.get('/specific',async(req,res)=>{
    const item = req.query.item;
    console.log(item)
    const query = {item:item};
    console.log(query)
    const result=await foodsCollection.find(query).toArray()
    res.json(result)
    console.log(result)
   
})

     
    //  All Food Item Delete Method Part

    app.delete('/manageOrder/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id)
        const query={_id:ObjectId(id)};
        const result=await orderCollection.deleteOne(query);
        res.json(result)
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
          }
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