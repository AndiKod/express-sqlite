const express = require('express')
const app = express()
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("brainy-shawl-elkCyclicDB")

const animals = db.collection("animals")

// create an item in collection with key "leo"
let leo = await animals.set("leo", {
    type: "cat",
    color: "orange"
})

// get an item at key "leo" from collection animals
let item = await animals.get("leo")

app.all('/', (req, res) => {

    

    console.log("Just got a request!")
    res.send('Yo ' + item.color + ' ' + item.type)
})

app.listen(process.env.PORT || 3000)