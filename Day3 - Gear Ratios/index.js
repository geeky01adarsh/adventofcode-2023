import fs from "fs";

const arr = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

// util functions
const isSymbol = (char) => {
  return char !== "." && (char <= "0" || char >= "9");
};

const isNumber = (char) => {
  return char >= "0" && char <= "9";
};

const adjancencyCheck = (matrix, { symbol, row, col }) => {
  return {
    top:
      col > 0
        ? {
            left: row > 0 ? matrix[row - 1][col - 1] : 0,
            center: matrix[row][col - 1],
            right: row < matrix.length - 1 ? matrix[row + 1][col - 1] : 0,
          }
        : {},
    center: {
      left: row > 0 ? matrix[row - 1][col] : 0,
      right: row < matrix.length - 1 ? matrix[row + 1][col] : 0,
    },
    bottom:
      col < matrix[0].length - 1
        ? {
            left: row > 0 ? matrix[row - 1][col + 1] : 0,
            center: matrix[row][col + 1],
            right: row < matrix.length - 1 ? matrix[row + 1][col + 1] : 0,
          }
        : {},
  };
};

const partOne = () => {
  const m = arr[0].length;
  let sum = 0;
  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < m; j++) {
      // handling if it is a number
      if (arr[i][j] >= "0" && arr[i][j] <= "9") {
        temp += arr[i][j];
        // flag = false;

        // for upper row
        if (i !== 0) {
          if (isSymbol(arr[i - 1][j])) flag = true;
          if (j !== 0) {
            if (isSymbol(arr[i - 1][j - 1])) flag = true;
          }
          if (j !== m - 1) {
            if (isSymbol(arr[i - 1][j + 1])) flag = true;
          }
        }

        // for lower row
        if (i !== arr.length - 1) {
          if (isSymbol(arr[i + 1][j])) flag = true;
          if (j !== 0) {
            if (isSymbol(arr[i + 1][j - 1])) flag = true;
          }
          if (j !== m - 1) {
            if (isSymbol(arr[i + 1][j + 1])) flag = true;
          }
        }
      }

      //   check if start or end have a symbol
      else if (arr[i][j] !== ".") {
        flag = true;
        if (temp.length) sum += Number(temp);
        temp = "";
      }

      //   handle the dot
      else {
        if (temp.length && flag) sum += Number(temp);
        temp = "";
        flag = false;
      }
    }
    if (temp.length && flag) sum += Number(temp);
  }
  return sum;
};

const partTwo = () => {
  // calculate the positions of symbols first
  // make matrix of numbers
  let symbolList = [];
  const n = arr.length,
    m = arr[0].length;

  // find the symbol list
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (isSymbol(arr[i][j])) {
        symbolList = [
          ...symbolList,
          {
            symbol: arr[i][j],
            row: i,
            col: j,
          },
        ];
      }
    }
  }

  // construct the matrix of numbers
  let matrix = arr.map((ele) => ele.split(""));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let temp = "";
      let x = i,
        y = j;
      if (isNumber(arr[i][j])) {
        while (y < m && isNumber(arr[x][y])) {
          temp += arr[x][y];
          y++;
        }
        while (j < y) matrix[i][j++] = Number(temp);
        j--;
      } else matrix[i][j] = 0;
    }
  }

  // now calculte the values
  let sum = 0,
    values = [];
  
  symbolList.map((sym) => {
    const { top, center, bottom } = adjancencyCheck(matrix, sym);
    const { symbol } = sym;
    const valuesWithDuplicates = [
      ...Object.values(top),
      ...Object.values(center),
      ...Object.values(bottom),
    ];

    values = [
      ...new Set(
        valuesWithDuplicates.filter((item) => item !== 0)
      ),
    ];

    // values.forEach((val) => (usedVal[val] = 1));

    // console.log(values);

    let currTotal = 1;
    if (symbol === "*") {
       
      if (values.length > 1) {
        values.forEach((value) => (currTotal *= value));
        sum += currTotal;
      }
    }
  });

  return sum;
};

// console.log(partOne());
console.log(partTwo());
