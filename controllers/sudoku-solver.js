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

  invalidRowPlacement(string/*, row, column, value*/) {
    let row = [];
    let strIndex = 0;
    let arrIndex = 0;
    while (strIndex<81) {
      while (arrIndex<9) {
        row.push(string[strIndex]);
        strIndex++;
        arrIndex++;
      }
      if (hasDuplicateNumbers(row)) return true;
      row = [];
      arrIndex = 0;
    }
    return false
  }

  invalidColumnPlacement(string/*, row, column, value*/) {
    let column = [];
    let strIndex = 0;
    let arrIndex = 0;
    while (arrIndex<9) {
      while (strIndex<81) {
        column.push(string[strIndex]);
        strIndex+=9;
      }
      if (hasDuplicateNumbers(column)) return true;
      arrIndex++;
      column = [];
      strIndex = arrIndex;
    }
    return false;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

function hasDuplicateNumbers(array) {
  let duplicates = array.reduce(function(accumulator, currentValue, currentIndex, array) {
    if (array.indexOf(currentValue) !== currentIndex && currentValue !== '.') {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []); // [] is the initial value
  return duplicates.length>0;
}
