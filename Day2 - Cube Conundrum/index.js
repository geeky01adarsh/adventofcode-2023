import fs from "fs";

// reading inputs
const inputStrings = fs.readFileSync("./input.txt", "utf-8").split("\n");

const partOne = () => {
  let sum = 0;

  inputStrings.forEach((input) => {
    var id = "";
    for (let i = 5; i < 8; i++) {
      if (input[i] >= "0" && input[i] <= 9) id += input[i];
    }
    const possiblities = input.split(':')[1].split(";");
    let possible = true;
    possiblities.forEach((possiblity) => {
      const balls = possiblity.split(",");

      balls.forEach((ball) => {
        let count = "";
        for (let i = 0; i < ball.length; i++) {
          if (!possible) break;
          if (ball[i] >= "0" && ball[i] <= "9") count += ball[i];
          else {
            count = Number(count);
            if (ball[i] == " ") continue;
            else if (ball[i] == "r") possible = count <= 12;
            else if (ball[i] == "g") possible = count <= 13;
            else possible = count <= 14;
            break;
          }
        }
      });
    });
    // console.log(id, possiblities, possible);
    if (possible) sum += Number(id);
  });
  return sum;
};



const partTwo = () => {
    let sum = 0;

  inputStrings.forEach((input) => {
    var id = "";
    for (let i = 5; i < 8; i++) {
      if (input[i] >= "0" && input[i] <= 9) id += input[i];
    }
    const possiblities = input.split(':')[1].split(";");
    // let possible = true;
    let maxiColors = {
        r:0,
        g:0,
        b:0
    }
    possiblities.forEach((possiblity) => {
      const balls = possiblity.split(",");

      balls.forEach((ball) => {
        let count = "";
        for (let i = 0; i < ball.length; i++) {
          if (ball[i] >= "0" && ball[i] <= "9") count += ball[i];
          else {
            count = Number(count);
            if (ball[i] == " ") continue;
            else if (ball[i] == "r") maxiColors.r = Math.max(maxiColors.r, count)
            else if (ball[i] == "g") maxiColors.g = Math.max(maxiColors.g, count)
            else maxiColors.b = Math.max(maxiColors.b, count)
            break;
          }
        }
      });
    });
    sum += (maxiColors.r*maxiColors.g*maxiColors.b);
  });
  return sum;
}

// console.log(partOne());
console.log(partTwo());