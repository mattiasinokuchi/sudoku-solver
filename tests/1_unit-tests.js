const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  
  suite('Puzzle string', () => {

    test('Valid string of 81 characters', function(done) {
      let string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      assert.equal(solver.validate(string),'');
      done();
    });
  });

// { "error": "Expected puzzle to be 81 characters long" }

});
