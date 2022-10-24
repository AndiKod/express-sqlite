const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const sqlite3 = require('sqlite3');
const exphbs = require('express-handlebars');
const logger = require('./middlewares/logger');


const users = require('./data/Users');
const { runInNewContext } = require('vm');


const dbname = 'data.db';
let db = new sqlite3.Database(dbname, err => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        db.run('CREATE TABLE users( \
            user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            lastname NVARCHAR(20)  NOT NULL,\
            firstname NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            address NVARCHAR(100),\
            country_code INTEGER\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            /*
            let insert = 'INSERT INTO users (lastname, firstname, title, address, country_code) VALUES (?,?,?,?,?)';
            db.run(insert, ["Chandan", "Praveen", "SE", "Address 1", 1]);
            db.run(insert, ["Samanta", "Mohim", "SSE", "Address 2", 1]);
            db.run(insert, ["Gupta", "Pinky", "TL", "Address 3", 1]);
            */
        });
    }
})


const app = express();



// Console log each route used
//app.use(logger);

// Handlebars Middleware
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

/*
app.get('/', (req, res) => res.render('index', {
    title: 'getRandom',

}));
*/



app.post("/users", body_parser.urlencoded({ extended: false }), (req, res, next) => {

    res.json({
        params : req.body
    })
 
    console.log(req.body)

    const sql = "INSERT INTO users (lastname, firstname) VALUES (?,?)";
    const user = [req.body.lastname, req.body.firstname];
    
    db.run(
        sql, 
        user, 
        err => {
            if (err) {
                console.log(err)
            }
        });
});


// READ single record
app.get("/users/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM users where user_id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// READ all records
app.get("/users", (req, res, next) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

// UPDATE record
app.patch("/users/", (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE users set lastname = ?, firstname = ?, title = ?, address = ?, country_code = ? WHERE user_id = ?`,
        [reqBody.lastname, reqBody.firstname, reqBody.title, reqBody.address, reqBody.country_code, reqBody.user_id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// DELETE record
app.delete("/users/:id", (req, res, next) => {
    db.run(`DELETE FROM users WHERE user_id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});




// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));