/**
 * Arrow Function that returns a Random Alphanumeric String
 */
const alphanumericUnique = () => {
  return Math.random()
    .toString(36)
    .split("")
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .join("")
    .substr(2, 8);
};

/**
 * Arrow function that return a integer random number from min and max
 */
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { alphanumericUnique, randomIntFromInterval };
