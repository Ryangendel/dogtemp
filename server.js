const express = require('express')
const path = require("path")
const app = express()
require('dotenv').config()
var bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb+srv://gendel.ryan%40gmail.com:P%40ssword!@cluster1.xupjqjl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = 'dogs';
const db = client.db(dbName);
const collection = db.collection('gooddogs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// process.env.PORT = 6478
const PORT = process.env.PORT || 3000

// console.log(process.env)
//CRUD 
//CREATE/READ/UPDATE/DELETE
//CR
//UD
//I/O

// var middleware = function(req, res, next){
// console.log("inside middleware")
//     next()

// }


// var DAL = {
//   insertIntoUsers:function(data){
//     database.insert({user:data})//Mongo Syntax
//   }, 
//   getAllUsers:function(user){
//     database.find({})
//     return data
//   }
// }

var database = [
  {name:"Runa", age:4, breed:"bulldog", id:1234},
  {name:"Hunter", age:6, breed:"yorkshire", id:12345},
  {name:"Skadi", age:2, breed:"bulldog", id:123456},
  {name:"Odie", age:4, breed:"pit", id:1234567},
  {name:"Buster", age:6, breed:"minpin", id:234567}
]


function addWeightToDog(req, res, next){
  req.weight = 52
  next()
}

// app.use(middleware)

app.get("/home", (req, res)=>{
  // console.log(req)
  
  res.sendFile(path.join(__dirname, 'index.html'))
})


app.get("/aboutus", (req, res)=>{
  // console.log(req)
  res.sendFile(path.join(__dirname, 'aboutus.html'))
})

  app.get("/getalldogs", async (req, res)=>{
    // console.log(req)
    await client.connect();
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
  })

app.post("/doginfo",async (req, res)=>{
  //logic here 
  const insertResult = await collection.insertOne(req.body);
  console.log('Inserted documents =>', insertResult);
  res.json(database)
})

app.delete("/doginfo/:id", async (req, res)=>{
  const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.params.id)});
  console.log('Deleted documents =>', deleteResult);
  res.json(database)
})
//------------------------------
//TODO: Write an API route that will recieve a request and add one year to the dogs age

app.put("/doginfo/:id", async (req, res)=>{
  const updateResult = await collection.updateOne({ _id: req.params.id }, { $inc: { age: +1 } });
  console.log('Updated documents =>', updateResult);
  res.json(updateResult)
})
//------------------------------
//CRUD
//[{},{},{}]

app.put("/doginfo/:id", (req, res)=>{
  // var database = [
  //   {name:"Runa", age:4, breed:"bulldog", id:1234},
  //   {name:"Hunter", age:6, breed:"yorkshire", id:12345},
  //   {name:"Skadi", age:2, breed:"bulldog", id:123456},
  //   {name:"Odie", age:4, breed:"pit", id:1234567}
  // ]
  console.log("%%%%%%%%%%%%%%%")
  console.log(req.body.occupiedShelter)
  console.log("%%%%%%%%%%%%%%%")
  for (let i = 0; i < database.length; i++) {
    if(req.params.id==database[i].id){
      database[i].interest = database[i].interest.push("somethingelse")
    }
  }
  res.json(database)
})


app.get('/doginfo/:id', async function (req, res) {
  var selectedDog = {}

  var data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=35.1065&lon=-106.6060&appid=6cba9d01ef70f28fac514fe4db61ef58")
  var dirtyData = await data.json()
  
    console.log("INSIDE API CALL Cleaned data below")
    console.log(dirtyData.main.temp)
    selectedDog.temp = dirtyData.main.temp

    await client.connect();
    const findResult = await collection.find({_id: new ObjectId(req.params.id)}).toArray();
    res.json(findResult)
})

app.listen(PORT, ()=>{
    console.log("listening on port ::::::::::::::::::::::: " + PORT)
})