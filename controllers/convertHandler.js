function ConvertHandler() {

  this.getNum = function(input) {
    // Extraer la parte numérica (hasta la primera letra)
    let result;
    let match = input.match(/^[.\d\/]+/); // Captura desde el inicio, números, punto y/o "/"
    
    if(!match) {
      // Si no hay parte numérica, asumimos "1"
      result = 1;
    } else {
      let numStr = match[0];
      
      // Verificamos si hay más de una barra "/"
      let slashCount = (numStr.match(/\//g) || []).length;
      if(slashCount > 1) {
        // Error: doble fracción
        return "invalid number";
      } else if(slashCount === 1) {
        // Fracción simple (ej: "1/2")
        let parts = numStr.split('/');
        if(parts.length !== 2) {
          return "invalid number";
        }
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);
        if(isNaN(numerator) || isNaN(denominator)) {
          return "invalid number";
        }
        result = numerator / denominator;
      } else {
        // No hay barra, puede ser entero o decimal
        let floatVal = parseFloat(numStr);
        if(isNaN(floatVal)) {
          // Si no se pudo parsear, por defecto 1
          result = 1;
        } else {
          result = floatVal;
        }
      }
    }

    return result;
  };

  this.getUnit = function(input) {
    // Extraer el texto que corresponde a la unidad (a partir de la primera letra)
    let result = input.match(/[a-zA-Z]+$/);
    if(!result) {
      return "invalid unit";
    }
    
    result = result[0].toLowerCase();
    // Lista de unidades válidas (en minúsculas, excepto 'l' que lo manejaremos como 'L')
    const validUnits = ['gal','l','mi','km','lbs','kg'];

    if(!validUnits.includes(result)) {
      return "invalid unit";
    }

    // Convertir la 'l' a 'L' para manejarlo de forma estándar
    if(result === 'l') {
      result = 'L';
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    // Mapeo de la unidad inicial a la unidad de destino
    let unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    // Mapeo a la forma "completa" de cada unidad
    let spelledOut = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spelledOut[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }

    // Redondear a 5 decimales
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Construir la frase final
    // Ej: "3 liters converts to 0.79252 gallons"
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
