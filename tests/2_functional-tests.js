const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const validString = require ('../controllers/puzzle-strings.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Solve a puzzle', () => {

    test('Valid string', function(done) {
      chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0]
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.property(res.body, 'solution', true);
        assert.equal(res.body.solution, validString.puzzlesAndSolutions[0][1]);
        done();
      });
    });
  });
});

