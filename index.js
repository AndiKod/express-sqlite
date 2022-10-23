const express = require('express')
const app = express()








app.all('/', (req, res) => {

    const CyclicDB = require('cyclic-dynamodb')
    const db = CyclicDB('doubtful-dove-gownCyclicDB') 

    const run = async function(){

    let animals = db.collection('animals')

    // create an item in collection with key "leo"
    let leo = await animals.set('leo', {
        type:'cat',
        color:'orange'
    })    

       

    let foo = " BAR "
    console.log("vraiment? aucun log?")
    res.send('Bof!' + foo)
}
run()

        



    
})

app.listen(process.env.PORT || 3000)