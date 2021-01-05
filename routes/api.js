'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      try {
        solver.checkPlace(req.body.puzzle, req.body.coordinate, req.body.value);
        res.json({
          valid: true
        });
      } catch (error) {
        if (Array.isArray(error)) {
          res.json({
            valid: false,
            conflict: error
          });
        } else {
          res.json({
            error: error
          });
        }
      }
    });
    
  app.route('/api/solve')
    .post(async function (req, res) {
      try {
        const solution = await solver.solve(req.body.puzzle);
        res.json({
          solution: solution
        });
      } catch (error) {
        res.json({
          error: error
        });
      }
    });
};
