const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middlewares/logger');

const users = require('./data/Users');
const colors = require('./data/Colors');

const app = express();

// Console log each route used
//app.use(logger);

// Handlebars Middleware
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'getRandom',
    users
}));

app.get('/color', (req, res) => {
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    res.json(randomColor);
})


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));