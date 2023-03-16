const express = require('express');
const app = express();
const cors = require("cors");

//Importamos conexion a MongoDB
const archivoBD = require('./conexion');

//importacion del archivo de rutas y modelo de cursos
const rutacurso = require('./rutas/curso');

//imortamos body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true' }))

//para corregir politicas de cors
app.use(cors());

app.use('/api/curso', rutacurso);

app.get('/', (req, res) => {
    res.end('Bienvenidos al server');
})

app.listen(5000, function () {
    console.log('Servidor activo');
})