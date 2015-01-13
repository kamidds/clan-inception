// Common functions
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function minValue(val, min) { return val >= min ? val : min; }
function maxValue(val, max) { return val <= max ? val : max; }
function getRandomElem(array) { return array[Math.floor(Math.random()*array.length)]; }
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function differenceBetween(x, y) { return x > y ? x - y : y - x; }

function toCommaSeperatedList(array){
  if (array.length >= 3) return array.slice(0, array.length - 1).join(', ') + ", and " + array.slice(-1);
  else if (array.length === 2) return array[0] + " and " + array[1];
  else return array[0]
}