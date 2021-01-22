const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const validString = require ('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {
  
  //suite('Puzzle string', () => {

    test('valid puzzle string of 81 characters', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.equal(solver.validate(string), null);
      done();
    });

    test('puzzle string with invalid characters (not 1-9 or .)', function(done) {
      let invalidString = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(invalidString), 'Invalid characters in puzzle');
      done();
    });

    test('puzzle string that is not 81 characters in length', function(done) {
      let invalidString = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(invalidString), 'Expected puzzle to be 81 characters long');
      done();
    });

  //});

  //suite('Row placement', () => {
    
    test('valid row placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkRowPlacement(string, row, column, value), "valid");
      done();
    });

    test('invalid row placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 4;
      let value = 9
      assert.equal(solver.checkRowPlacement(string, row, column, value), "invalid");
      done();
    });

  //});

  //suite('valid column placement', () => {

    test('valid column placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkColPlacement(string, row, column, value), "valid");
      done();
    });

    test('invalid column placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 6
      assert.equal(solver.checkColPlacement(string, row, column, value), "invalid");
      done();
    });

  //});

  //suite('Region placement', () => {

    test('valid region placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 7
      assert.equal(solver.checkRegionPlacement(string, row, column, value), "valid");
      done();
    });

    test('invalid region placement', function(done) {
      let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "A";
      let column = 1;
      let value = 2
      assert.equal(solver.checkRegionPlacement(string, row, column, value), "invalid");
      done();
    });

  //});

  //suite('Solver', () => {

    test('valid puzzle strings pass the solver', function(done) {
      let string = "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
      let solution = "568913724342687519197254386685479231219538467734162895926345178473891652851726943";
      assert.equal(solver.solve(string), solution);
      done();
    });

    /*test('Invalid string', function(done) {
      let invalidString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....923914.67.";
      assert.throws(() => solver.solve(invalidString), /Puzzle cannot be solved/);
      done();
    });*/

    test('invalid puzzle strings fail the solver', function(done) {
      let invalidString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....923914.67.";
      assert.equal(solver.solve(invalidString), "Puzzle cannot be solved");
      done();
    });

    test('Solver returns the the expected solution for an incomplete puzzzle', function(done) {
      let string = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let solution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      assert.equal(solver.solve(string), solution);
      done();
    });

  //});

});
