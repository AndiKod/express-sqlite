const express = require('express')
const app = express()


app.all('/', (req, res) => {
    res.send('De la merde')   
})

app.get('/color', (req, res) => {

    //colors
    let colors = [
        'blue',
        'purple',
        'green',
        'orange',
        'yellow',
        'red',
        'navi'
    ]

    let randomColor = colors[Math.floor(Math.random() * colors.length)]

    res.send(randomColor);

})

app.listen(process.env.PORT || 3000)