import fs from "fs";

// reading inputs
const inputStrings = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n");

const partOne = () => {
  var sum = 0;
  inputStrings.forEach((str) => {
    let first = -1,
      last = -1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "0" && str[i] <= "9") {
        const num = Number(str[i]);
        if (first == -1) first = num;
        last = num;
      }
    }
    sum += first * 10 + last;
  });
  return sum;
};

const partTwo = () => {
  const numberValueList = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    eno: 1,
    owt: 2,
    eerht: 3,
    ruof: 4,
    evif: 5,
    xis: 6,
    neves: 7,
    thgie: 8,
    enin: 9,
  };

  const numberListRegex = new RegExp(
    [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "eno",
      "owt",
      "eerht",
      "ruof",
      "evif",
      "xis",
      "neves",
      "thgie",
      "enin",
    ].join("|")
  );

  var sum = 0;
  inputStrings.forEach((str) => {
    const firstNumber = Number(numberValueList[numberListRegex.exec(str)]);
    const lastNumber = Number(
      numberValueList[numberListRegex.exec(str.split("").reverse().join(""))]
    );

    sum += firstNumber * 10 + lastNumber;
  });
  return sum;
};

// partOne answer
console.log("Answer of part 1:",partOne());

// partTwo answer
console.log("Answer of part 2:",partTwo());

// utils for defining regex and value list
const reverseNumber = () => {
  const list = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ].map((number) => {
    return number.split("").reverse().join("");
  });

  list.forEach((num) => console.log(num + ":,"));
};
// getting utils for regexp
// reverseNumber();
