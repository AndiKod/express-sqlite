const express = require('express')
const app = express()








app.all('/', (req, res) => {

    const run = async function(){

    let foo = "bar"
    console.log("vraiment? aucun log?")
    res.send('Bof!' + foo)
}
run()

        



    
})

app.listen(process.env.PORT || 3000)