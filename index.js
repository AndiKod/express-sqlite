const express = require('express')
const app = express()


// get an item at key "leo" from collection animals
let item = await animals.get("leo")

app.all('/', (req, res) => {

    console.log("Just got a request!")
    res.send('Yo ')
})

app.listen(process.env.PORT || 3000)