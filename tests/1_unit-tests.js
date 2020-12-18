const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const validString = require ('../controllers/puzzle-strings.js');

suite('UnitTests', () => {
  
  suite('Puzzle string', () => {

    test('Valid string', function(done) {
      assert.equal(solver.validate(validString.puzzlesAndSolutions[0][0]),'');
      done();
    });

    test('Invalid characters', function(done) {
      let string = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.deepEqual(solver.validate(string), { error: "Invalid characters in puzzle" });
      done();
    });

    test('Not 81 characters', function(done) {
      let string = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.deepEqual(solver.validate(string), { error: "Expected puzzle to be 81 characters long" });
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

    test('Valid string 1', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[0][0]), validString.puzzlesAndSolutions[0][1]);
      done();
    });

    test('Valid string 2', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[1][0]), validString.puzzlesAndSolutions[1][1]);
      done();
    });

    test('Valid string 3', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[2][0]), validString.puzzlesAndSolutions[2][1]);
      done();
    });

    test('Valid string 4', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[3][0]), validString.puzzlesAndSolutions[3][1]);
      done();
    });

    test('Valid string 5', function(done) {
      assert.equal(solver.solve(validString.puzzlesAndSolutions[4][0]), validString.puzzlesAndSolutions[4][1]);
      done();
    });

  });
});
