const express = require('express')
const app = express()
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("brainy-shawl-elkCyclicDB")
const animals = db.collection("animals")




app.all('/', (req, res) => {

    console.log("Just got a request!")
    res.send('Yo ')
})

app.listen(process.env.PORT || 3000)