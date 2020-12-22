'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post(async function (req, res) {
      /*if (!req.body.puzzle) {
        res.json({ error: 'Required field missing' });
      }*/
      try {
        const solution = await solver.solve(req.body.puzzle);
        res.json({
          solution: solution
        });
      } catch (error) {
        res.json({
          error: error
        });
        console.log(error);
      }
    });
};
