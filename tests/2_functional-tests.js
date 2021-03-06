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

    test('Missing string', function(done) {
      chai.request(server)
      .post('/api/solve')
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Required field missing' });
        done();
      });
    });

    test('Invalid characters', function(done) {
      let string = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: string
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      });
    });

    test('Incorrect length', function(done) {
      let string = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: string
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      });
    });

    test('Cannot be solved', function(done) {
      let string = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....923914.67.';
      chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: string
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
        done();
      });
    });

  });

  suite('Check a puzzle placement', () => {

    test('All fields', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: 7
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { valid: true });
        done();
      });
    });

    test('Single conflict', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: 3
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { valid: false, conflict: ['column'] });
        done();
      });
    });

    test('Multiple conflicts', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: 8
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column'] });
        done();
      });
    });

    test('All conflicts', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: 2
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
        done();
      });
    });

    test('Missing fields', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        done();
      });
    });

    test('Invalid characters', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'a1',
        value: 7
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
        done();
      });
    });

    test('Not 81 characters', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'a1',
        value: 7
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
        done();
      });
    });

    test('Invalid coordinate', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'j10',
        value: 7
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Invalid coordinate' });
        done();
      });
    });

    test('Invalid value', function(done) {
      chai.request(server)
      .post('/api/check')
      .send({
        puzzle: validString.puzzlesAndSolutions[0][0],
        coordinate: 'a1',
        value: -1
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, true);
        assert.deepEqual(res.body, { error: 'Invalid value' });
        done();
      });
    });

  });

});
