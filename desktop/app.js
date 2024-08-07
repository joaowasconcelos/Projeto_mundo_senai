require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/clinicaRoutes');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'publico')));

// Configuração da sessão deve vir antes do uso do flash
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
    store: new session.MemoryStore() // Considere um armazenamento persistente em produção
}));

// Agora, inicialize o connect-flash
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

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});
