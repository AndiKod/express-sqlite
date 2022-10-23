const express = require('express');
const path = require('path');
// Data sets for the endpoints
const colors = require('./data/Colors');

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/color', (req, res) => {
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    res.json(randomColor);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));