import fs, { readFileSync } from "fs";

const arr = readFileSync("./input.txt", "utf-8")
  .split("\r\n")
  .map((line) =>
    line
      .split(" ")
      .filter((ele) => !isNaN(ele))
      .filter((ele) => ele !== "")
  );

const partOne = () => {
  let sum = 0;
  arr.forEach((ele) => {
    let valueMap = {};
    let count = 0;
    for (let i = 0; i < 10; i++) {
      valueMap[ele[i]] = 1;
    }
    for (let i = 10; i < ele.length; i++) {
      if (valueMap[ele[i]] === 1) {
        count++;
      }
    }
    if (count != 0) {
      count--;
      sum += 1 << count;
    }
  });
  return sum;
};

const partTwo = () => {
  let sum = 0;
  let mulObj = {};
  let idx = 0;
  arr.forEach((ele) => {
    let valueMap = {};
    let count = 0;
    for (let i = 0; i < 10; i++) {
      valueMap[ele[i]] = 1;
    }
    for (let i = 10; i < ele.length; i++) {
      if (valueMap[ele[i]] === 1) {
        count++;
      }
    }

    if (mulObj[idx] === undefined) mulObj[idx] = 1;
    else mulObj[idx]++;
    for (let i = idx + 1; i <= idx + count && i < arr.length; i++) {
      if (mulObj[i] === undefined) mulObj[i] = mulObj[idx];
      else mulObj[i] += mulObj[idx];
    //   console.log(mulObj[i])
    }

    idx++;
    // console.log(mulObj); 
  });


  sum = Object.values(mulObj).reduce((a, b) => a + b);

  return sum;
};

// console.log(partOne());
console.log(partTwo());
