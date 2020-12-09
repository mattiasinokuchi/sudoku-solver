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

  hasInvalidRow(string/*, row, column, value*/) {
    let row = [];
    let strIndex = 0;
    let arrIndex = 0;
    while (strIndex<81) {
      while (arrIndex<9) {
        row.push(string[strIndex]);
        strIndex++;
        arrIndex++;
      }
      if (hasDuplicate(row)) return true;
      row = [];
      arrIndex = 0;
    }
    return false
  }

  hasInvalidColumn(string/*, row, column, value*/) {
    let column = [];
    let strIndex = 0;
    let arrIndex = 0;
    while (arrIndex<9) {
      while (strIndex<81) {
        column.push(string[strIndex]);
        strIndex+=9;
      }
      if (hasDuplicate(column)) return true;
      arrIndex++;
      column = [];
      strIndex = arrIndex;
    }
    return false;
  }

  hasInvalidRegion(string/*, row, column, value*/) {
    let row = [];
    let strIndex = 0;
    let arrIndex = 0;
    while (strIndex<81) {
      while (arrIndex<3) {
        row.push(string[strIndex]);
        strIndex++;
        arrIndex++;
      }
      if (hasDuplicate(row)) return true;
      console.log(string, row);
      strIndex+=6;
      arrIndex = 0;
    }
    return false
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

function hasDuplicate(array) {
  let duplicates = array.reduce(function(accumulator, currentValue, currentIndex, array) {
    if (array.indexOf(currentValue) !== currentIndex && currentValue !== '.') {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []); // [] is the initial value
  return duplicates.length>0;
}
