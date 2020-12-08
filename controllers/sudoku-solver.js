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

  checkRowPlacement(puzzleString, row, column, value) {
    // divide string into one array of rows
    let arrayOfAllRows = puzzleString.match(/.{1,9}/g);
    arrayOfAllRows.forEach((element) => {
      // extract numbers
      let oneRowOfNumbers = element.replace(/\./g, '');
      // check for duplicate numbers
      if (hasDuplicateNumbers(oneRowOfNumbers)) return true;
    });
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

function hasDuplicateNumbers(string) {
  return /([1-9])\1/g.test(string);
}
