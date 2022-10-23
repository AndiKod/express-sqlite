const express = require('express')
const app = express()
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("brainy-shawl-elkCyclicDB")




app.all('/', (req, res) => {

    console.log("Just got a request!")
    res.send('Yo ')
})

app.listen(process.env.PORT || 3000)