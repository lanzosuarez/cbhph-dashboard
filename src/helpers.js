export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRange = (range, arr = true, startFromZero = true) => {
  if (arr) {
    return [...new Array(range)].map((_, index) => index);
  } else {
    return [...new Array(range)].map((_, index) => ({
      [startFromZero ? index : index + 1]: 0
    }));
  }
};
