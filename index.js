const express = require('express')
const app = express()
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("brainy-shawl-elkCyclicDB")



console.log("vraiment? aucun log?")



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

        
        res.send('Yo, yo')

    }

    

    run()

    
})

app.listen(process.env.PORT || 3000)