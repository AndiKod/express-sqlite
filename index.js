const express = require('express')
const app = express()




console.log("vraiment? aucun log?")



app.all('/', (req, res) => {




        
        res.send('Bof')



    
})

app.listen(process.env.PORT || 3000)