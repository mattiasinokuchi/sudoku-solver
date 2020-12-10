class SudokuSolver {

  // Function for validate the input string...
  validate(string) {
    // ...defines valid characters...
    let invalidCharacter = /[^.0-9]/.test(string);
    // ...return first error message...
    if (invalidCharacter) {
      return { error: "Invalid characters in puzzle" };
    // ...return second message...
    } else if (string.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    // ...or return nothing
    } else {
      return '';
    }
  }

  // Function for validate rows...
  hasInvalidRow(string/*, row, column, value*/) {
    let row = [];
    let strIndex = 0;
    // ...loops until all characters in string is checked
    while (strIndex<81) {
      // ...loops until one row is completed...
      while (row.length<9) {
        row.push(string[strIndex]);
        strIndex++;
      }
      // ...checks row and returns true if invalid...
      if (hasDuplicate(row)) return true;
      row = [];
    // ...or return false if all rows are valid
    }
    return false
  }

  // Function for validate columns...
  hasInvalidColumn(string/*, row, column, value*/) {
    let column = [];
    let strIndex = 0;
    let colIndex = 0;
    // ...make loops for all columns... 
    while (colIndex<9) {
      // ...with loops for all characters...
      while (strIndex<81) {
        // ...where character is added from the string to the column array...
        column.push(string[strIndex]);
        // ...heads for character in next column...
        strIndex+=9;
      }
      // ...checks columns and returns true if invalid...
      if (hasDuplicate(column)) return true;
      // ...or creates a new column...
      colIndex++;
      column = [];
      // ...heads for character next to first character of the previous column...
      strIndex = colIndex;
    }
    //　...return false if all columns are valid
    return false;
  }

  // Function for validate regions...
  hasInvalidRegion(string/*, row, column, value*/) {
    let region = [];
    let strIndex = 0;
    let arrIndex = 0;
    let regIndex = 0;
    // ...make loops for all regions...
    while (regIndex<9) {
      // ...with loops for all characters in one region...
      while (region.length<9) {
        // ...with loops for all characters from one row in one region...
        while (arrIndex<3) {
          // ...adds 
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
