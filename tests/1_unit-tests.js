const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const validString = require ('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {
  
  suite('Puzzle string', () => {

    test('Valid string', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.equal(solver.validate(string), null);
      done();
    });

    test('Invalid characters', function(done) {
      let invalidString = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(invalidString), 'Invalid characters in puzzle');
      done();
    });

    test('Not 81 characters', function(done) {
      let invalidString = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(invalidString), 'Expected puzzle to be 81 characters long');
      done();
    });

  });

  suite('Row placement', () => {
    
    test('Valid row', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkRowPlacement(string, row, column, value), "valid");
      done();
    });

    test('Invalid row', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 4;
      let value = 9
      assert.equal(solver.checkRowPlacement(string, row, column, value), "invalid");
      done();
    });

  });

  suite('Column placement', () => {

    test('Valid column', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkColPlacement(string, row, column, value), "valid");
      done();
    });

    test('Invalid column', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 6
      assert.equal(solver.checkColPlacement(string, row, column, value), "invalid");
      done();
    });

  });

  suite('Region placement', () => {

    test('Valid region', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkRegionPlacement(string, row, column, value), "valid");
      done();
    });

    test('Invalid region', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 2
      assert.equal(solver.checkRegionPlacement(string, row, column, value), "invalid");
      done();
    });

  });

  suite('Solver', () => {

    test('Valid strings', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.doesNotThrow(() => solver.solve(string));
      done();
    });

    test('Invalid string', function(done) {
      let invalidString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....923914.67.";
      assert.throws(() => solver.solve(invalidString), /Puzzle cannot be solved/);
      done();
    });

    test('Expected solution', function(done) {
      let string = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let solution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      assert.equal(solver.solve(string), solution);
      done();
    });

  });

});
