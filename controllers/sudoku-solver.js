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

  invalidRowPlacement(string, trow, column, value) {
    // make array from string
    let row = [];
    let strIndex = 0;
    let arrIndex = 0;
    //let puzzle = [];
    while (strIndex<81) {
      while (arrIndex<9) {
        row.push(string[strIndex]);
        strIndex++;
        arrIndex++;
      }
      if (hasDuplicateNumbers(row)) return true;
      //puzzle.push(row);
      row = [];
      arrIndex = 0;
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
