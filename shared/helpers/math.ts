let alphanumericUnique = () => {
  return Math.random()
    .toString(36)
    .split("")
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .join("")
    .substr(2, 8);
};

let randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { alphanumericUnique, randomIntFromInterval };
