const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const validString = require ('../controllers/puzzle-strings.js');

suite('UnitTests', () => {
  
  suite('Puzzle string', () => {

    test('Valid string', function(done) {
      assert.equal(solver.hasInvalidInput(validString.puzzlesAndSolutions[0][0]), null);
      done();
    });

    test('Invalid characters', function(done) {
      let invalidCharacter = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidInput(invalidCharacter), 'Invalid characters in puzzle');
      done();
    });

    test('Not 81 characters', function(done) {
      let shortString = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidInput(shortString), 'Expected puzzle to be 81 characters long');
      done();
    });

  });

  suite('Row placement', () => {
    
    test('Valid row', function(done) {
      assert.equal(solver.hasInvalidRow(validString.puzzlesAndSolutions[0][0]), false);
      done();
    });

    test('Invalid row', function(done) {
      let string = '.9.9.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidRow(string), true);
      done();
    });

  });

  suite('Column placement', () => {

    test('Valid column', function(done) {
      assert.equal(solver.hasInvalidColumn(validString.puzzlesAndSolutions[0][0]), false);
      done();
    });

    test('Invalid column', function(done) {
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..61.';
      assert.equal(solver.hasInvalidColumn(string), true);
      done();
    });

  });

  suite('Region placement', () => {

    test('Valid region', function(done) {
      assert.equal(solver.hasInvalidRegion(validString.puzzlesAndSolutions[0][0]), false);
      done();
    });

    test('Invalid region', function(done) {
      let string = '..9..5.1.95.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidRegion(string), true);
      done();
    });

  });

  suite('Solver', () => {

    test('Valid strings', function(done) {
      assert.doesNotThrow(() => solver.solve(validString.puzzlesAndSolutions[0][0]));
      done();
    });

    test('Invalid string', function(done) {
      let invalidString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....923914.67.';
      try {
        assert.fail(solver.solve(invalidString));
      } catch (error) {
        assert.throws(function () { solver.solve(invalidString)}, /Puzzle cannot be solved/);
      }
      done();
    });

    test('Expected solution', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[0][0]), validString.puzzlesAndSolutions[0][1]);
      done();
    });

  });

});
