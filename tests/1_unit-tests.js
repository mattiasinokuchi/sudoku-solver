const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  
  suite('Puzzle string', () => {

    test('Valid string', function(done) {
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(string),'');
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
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidRow(string), false);
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
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidColumn(string), false);
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
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.hasInvalidRegion(string), false);
      done();
    });
  });
});
