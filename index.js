const express = require('express')
const app = express()








app.all('/', (req, res) => {

        let foo = "bar"


        console.log("vraiment? aucun log?")
        res.send('Bof ! ! !' + foo)



    
})

app.listen(process.env.PORT || 3000)