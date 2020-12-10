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
    let region = [];
    let strIndex = 0;
    let arrIndex = 0;
    let regIndex = 0;
    while (regIndex<9) {
      while (region.length<9) {
        while (arrIndex<3) {
          region.push(string[strIndex]);
          strIndex++;
          arrIndex++;
        }
        if (hasDuplicate(region)) return true;
        strIndex+=6;
        arrIndex = 0;
      }
      region = [];
      regIndex++;
      if (regIndex<3) strIndex = regIndex*3;
      else if (regIndex<6) strIndex = 18 + regIndex*3;
      else if (regIndex<9) strIndex = 36 + regIndex*3;
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
