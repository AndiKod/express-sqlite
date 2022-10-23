const express = require('express')
const app = express()








app.all('/', (req, res) => {




        console.log("vraiment? aucun log?")
        res.send('Bof ! ! !')



    
})

app.listen(process.env.PORT || 3000)