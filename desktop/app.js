const express = require('express')
const bodyParser = require('body-parser');
const router = require("./src/routes/clinicaRoutes")
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const port= 3000;

app.use(express.json());

// Configuração do bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Configurando o diretório de views
app.set('layout', 'layouts/main'); // Define o layout principal

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'publico')));
// Rotas
app.use('/',router);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});