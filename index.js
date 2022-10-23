const express = require('express')
const app = express()
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("brainy-shawl-elkCyclicDB")
const animals = db.collection("animals")






app.all('/', (req, res) => {

    const run = async function(){
    let animals = db.collection('animals')

        // create an item in collection with key "leo"
        let leo = await animals.set('leo', {
            type:'cat',
            color:'orange'
        })

        // get an item at key "leo" from collection animals
        let item = await animals.get('leo')

        console.log("Just got a request!")
        res.send('Yo:' + item.type)

    }

    

    run()

    
})

app.listen(process.env.PORT || 3000)