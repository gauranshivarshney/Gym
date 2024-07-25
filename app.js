const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const userController = require("./controller/userController");
const bodyParser = require('body-parser');
const session = require('express-session');

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "mysession",
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/service', (req, res) => {
    res.render("service");
});

app.get('/join', (req, res) => {
    res.render("join");
});

app.get('/register', userController.loadRegister);

app.post('/register', userController.insertUser);

app.get('/login', userController.loginLoad);

app.post('/login', userController.verifyLogin);

app.get('/view', userController.loadView);

app.get('/logout', userController.userLogout);

app.get('/stay', (req, res) => {
    res.render("stay");
});

app.listen(3000);