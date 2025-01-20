'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Rutas y test-runner
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

// Instanciamos la app
const app = express();

// Servir archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Activar CORS (recomendado por freeCodeCamp)
app.use(cors({ origin: '*' }));

// Usar body-parser para parsear POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Página principal (HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// Rutas para tests de FCC
fccTestingRoutes(app);

// Rutas de la API
apiRoutes(app);

// Middleware 404
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Arrancamos el servidor
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);

  // Si estamos en modo test, ejecutamos los tests
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

// Exportamos la app para testing
module.exports = app;
