const express = require('express')
const path = require("path")
const app = express()
//require('dotenv').config()
var bodyParser = require('body-parser');

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

var middleware = function(req, res, next){
console.log("inside middleware")
    next()

}

var database = [
  {name:"Runa", age:4, breed:"bulldog", id:1234},
  {name:"Hunter", age:6, breed:"yorkshire", id:12345},
  {name:"Skadi", age:2, breed:"bulldog", id:123456},
  {name:"Odie", age:4, breed:"pit", id:1234567}
]


function addWeightToDog(req, res, next){
  req.weight = 52
  next()
}

app.use(middleware)

app.get("/home", (req, res)=>{
  // console.log(req)
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get("/doginfo", (req, res)=>{
  console.log(req)
  res.json(database)
})

app.post("/doginfo",(req, res)=>{
  console.log(req)
  req.body.id = Math.floor(100000 + Math.random() * 900000)
  req.body.weight = req.weight
  database.push(req.body)
  res.json(database)
})

app.post("/doginfo", addWeightToDog ,(req, res)=>{
  console.log(req)
  req.body.id = Math.floor(100000 + Math.random() * 900000)
  req.body.weight = req.weight
  database.push(req.body)
  res.json(database)
})

app.delete("/doginfo/:id", (req, res)=>{
  console.log(req.params.id)
  for (let i = 0; i < database.length; i++) {
    if(req.params.id==database[i].id){
      database.splice(i, 1)
    }
  }
  res.json(database)
})

app.put("/doginfo/:id", (req, res)=>{
  for (let i = 0; i < database.length; i++) {
    if(req.params.id==database[i].id){
      database[i].caretaker = req.body.caretaker
    }
  }
  res.json(database)
})


app.get('/doginfo/:id', middleware, async function (req, res) {
  var selectedDog = {}

  var data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=35.1065&lon=-106.6060&appid=6cba9d01ef70f28fac514fe4db61ef58")
  var dirtyData = await data.json()
  
    console.log("INSIDE API CALL Cleaned data below")
    console.log(dirtyData.main.temp)
    selectedDog.temp = dirtyData.main.temp

  for (let i = 0; i < database.length; i++) {
    if(req.params.id==database[i].id){
      console.log("isnide info")
      selectedDog.dogData = database[i]
    }
  }
  res.json(selectedDog)
})

app.listen(PORT, ()=>{
    console.log("listening on port " + PORT)
})

