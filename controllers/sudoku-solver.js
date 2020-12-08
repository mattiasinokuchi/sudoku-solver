class SudokuSolver {

  validate(puzzleString) {
    let invalidCharacter = /[^.0-9]/.test(puzzleString);
    if (invalidCharacter) {
      return { error: "Invalid characters in puzzle" };
    } else if (puzzleString.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    } else {
      return '';
    }
  }

  checkRowPlacement(string, trow, column, value) {
    // make array from string
    let row = [];
    let char = 0;
    let rowIndex = 0;
    let puzzle = [];
    while (char<81) {
      while (rowIndex<9) {
        row.push(string[char]);
        char++;
        rowIndex++;
      }
      if (hasDuplicateNumbers(row)) return true;
      puzzle.push(row);
      row = [];
      rowIndex = 0;
    }
    return false
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

function hasDuplicateNumbers(array) {
  var duplicates = array.reduce(function(acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  }, []);
  return duplicates.length>1;
}
