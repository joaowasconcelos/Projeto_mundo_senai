// require('dotenv').config();
// const jwt = require("jsonwebtoken")
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/clinicaRoutes');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'seuSegredo',
    resave: false,
    saveUninitialized: true
}));


app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});



app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'publico')));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 900000, httpOnly: true },
    store: new session.MemoryStore() 
}));

app.use(express.urlencoded({ extended: true }));

app.use('/', router );

app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});
