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
    return [...new Array(range)].map((_, index) => startFromZero ? index : index + 1);
  } else {
    return [...new Array(range)].map((_, index) => ({
      [startFromZero ? index : index + 1]: 0
    }));
  }
};


export const getDaysInMonth = (year, month) =>
  new Date(year, month, 0).getDate();

export const getDaysInAweek = (date = new Date()) => {
  let curr = date // get current date
  let first = curr.getDate() - curr.getDay();
  let firstday = (new Date(curr.setDate(first))).toString();
  let days = [firstday];
  for (var i = 1; i < 7; i++) {
    var next = new Date(curr.getTime());
    next.setDate(first + i);

    days.push(next.toString());
  }
  return days;
}