'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      let input = req.query.input;
      
      // Obtener número y unidad
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Verificar si ambas partes son inválidas
      if(initNum === "invalid number" && initUnit === "invalid unit") {
        return res.send("invalid number and unit");
      }
      // Verificar si el número es inválido
      if(initNum === "invalid number") {
        return res.send("invalid number");
      }
      // Verificar si la unidad es inválida
      if(initUnit === "invalid unit") {
        return res.send("invalid unit");
      }
      
      // Calcular la conversión
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      // Construir la cadena de salida
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Devolver en formato JSON
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });

};
