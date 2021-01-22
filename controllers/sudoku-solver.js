class SudokuSolver {

  // Function for validate input
  hasInvalidInput(string) {
    if (!string) return 'Required field missing';
    let invalidCharacter = /[^.1-9]/.test(string);
    if (invalidCharacter) return 'Invalid characters in puzzle';
    if (string.length != 81) return 'Expected puzzle to be 81 characters long';
    return;
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
        // ...where a character is added from the string to the column array...
        column.push(string[strIndex]);
        // ...heads for character in next column...
        strIndex+=9;
      }
      // ...or checks completed column and returns true if invalid...
      if (hasDuplicate(column)) return true;
      // ...or creates a new column...
      colIndex++;
      column = [];
      // ...and heads for character next to first character of the previous column...
      strIndex = colIndex;
    }
    //　...or return false if all columns are valid
    return false;
  }

  // Function for validate regions...
  hasInvalidRegion(string/*, row, column, value*/) {
    let region = [];
    let strIndex = 0;
    let rowIndex = 0;
    let regIndex = 0;
    // ...make loops for all regions...
    while (regIndex<9) {
      // ...with loops for all characters in one region...
      while (region.length<9) {
        // ...with loops for all characters from one row in each region...
        while (rowIndex<3) {
          // ...where a character is added from the string to the region array... 
          region.push(string[strIndex]);
          // ...heads for the next character...
          strIndex++;
          rowIndex++;
        }
        // ...or heads for a new character at the next row... 
        strIndex+=6;
        rowIndex = 0;
      }
      // ...or checks completed region and returns true if invalid...
      if (hasDuplicate(region)) return true;
      // ...heads for a new region...
      region = [];
      regIndex++;
      // ...a new character starting at top row...
      if (regIndex<3) strIndex = regIndex*3;
      // ...three rows below... 
      else if (regIndex<6) strIndex = 18 + regIndex*3;
      // ...or another three rows below...
      else if (regIndex<9) strIndex = 36 + regIndex*3;
    }
    //　...or return false if all regions are valid
    return false
  }

  // Function for solving sudoku by brute force...
  solve(string, answer) {
    if (this.hasInvalidInput(string)) throw this.hasInvalidInput(string);
    // ...splits string to an array...
    const solution = string.split('');
    let backToIndex = solution.length;
    // ...loops solving which...
    while (gaps(solution)>0) {
      let gapsBefore = gaps(solution);
      // ...heads for the first gap...
      let index = solution.indexOf('.');
      // ...with the first number...
      let number = 1;
      // ...loops a trial which...
      while (isInvalid(solution) || number===1) {
        if (number<10) {
        // ...increments the number...
        solution[index] = number++;
        } else {
          // ...or modifies solution...
          modify(solution, backToIndex);
          if (backToIndex>solution.lastIndexOf(lastFilled(solution))) {
            // ...updates backToIndex if a gap is reset...
            backToIndex = solution.lastIndexOf(lastFilled(solution));
          }
          // ...heads back to solving...
          break;
        }
      }
      let gapsAfter = gaps(solution);
      if (gapsBefore>gapsAfter) {
        // ...updates backToIndex if a gap is filled...
        backToIndex = solution.lastIndexOf(lastFilled(solution));
      }
      if (backToIndex<0) {
        throw 'Puzzle cannot be solved';
      }
    }
    return solution.join('');
  }

  // Function for checking manual placement
  checkPlace(string, coordinate, value) {
    if (!string || !coordinate || !value) throw 'Required field(s) missing';
    let invalidValid = /[^.1-9]/.test(value);
    if (invalidValid) throw 'Invalid value';
    if (this.hasInvalidInput(string)) throw this.hasInvalidInput(string);
    let conflicts = [];
    const index = indexOf(coordinate);
    const newString = setString(string, index, value);
    if (this.hasInvalidRow(newString)) conflicts.push('row');
    if (this.hasInvalidColumn(newString)) conflicts.push('column');
    if (this.hasInvalidRegion(newString)) conflicts.push('region');
    if (conflicts.length>0) throw conflicts;
    return;
  }
}

module.exports = SudokuSolver;

let solver = new SudokuSolver();

function hasDuplicate(array) {
  let duplicates = array.reduce(function(accumulator, currentValue, currentIndex, array) {
    if (array.indexOf(currentValue) !== currentIndex && currentValue !== '.') {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []); // [] is the initial value
  return duplicates.length>0;
}

// Function to back and find a different solution...
function modify(solution, backToIndex) {
  // ...resets filled numbers...
  while (backToIndex<solution.lastIndexOf(lastFilled(solution))) {
    solution[solution.lastIndexOf(lastFilled(solution))] = '.';
  }
  while (lastFilled(solution)===9) {
    // ...resets last filled number 9...
    solution[solution.lastIndexOf(lastFilled(solution))] = '.';
  }
  // ...increments last filled number 1-8...
  solution[solution.lastIndexOf(lastFilled(solution))] = lastFilled(solution)+1;
  return;
}

// Function to return if solution is invalid
function isInvalid(solution) {
  if (solver.hasInvalidRow(solution.join('')) || solver.hasInvalidColumn(solution.join('')) || solver.hasInvalidRegion(solution.join(''))) {
    return true;
  } else return false;
}

// Function to return last filled number...
function lastFilled(solution) {
  // ...finds numbers filled in...
  let filled = solution.reduce(function (accumulator, currentValue) {
    // (ignores numbers from the clue since they are strings)
    if (typeof(currentValue) === 'number') {
      accumulator.push(currentValue);
    }
    return accumulator
  }, []);
  return filled[filled.length-1];
}

// Function to return number of gaps...
function gaps (solution) {
  return solution.filter(gaps => gaps == '.').length;
}

// Function to convert puzzle coordinate to string index
function indexOf (coordinate) {
  const row = coordinate[0].toLowerCase();
  const column = Math.floor(coordinate[1]);
  if (isNaN(column)) throw 'Invalid coordinate';
  switch (row) {
    case 'a': return column - 1
    case 'b': return 8 + column
    case 'c': return 17 + column
    case 'd': return 26 + column
    case 'e': return 35 + column
    case 'f': return 44 + column
    case 'g': return 53 + column
    case 'h': return 62 + column
    case 'i': return 71 + column
    default: throw 'Invalid coordinate'
  }
}

// Function to make a new string
function setString (string, index, value) {
  const array = string.split('');
  array[index] = value;
  return array.join('');
}