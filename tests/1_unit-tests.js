const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test('Fractional input', function(done) {
      let input = '1/2mi';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      let input = '2.5/5km';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Error on double-fraction (3/2/3)', function(done) {
      let input = '3/2/3km';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('Default to 1 when no numerical input is provided', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Each valid input unit', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let expected = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      done();
    });

    test('Error for an invalid input unit', function(done) {
      let input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return unit for each valid unit', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Spelled-out string unit', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('L to Gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.04670;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });

});
