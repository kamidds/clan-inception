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

//accepts any value like '#ffffff', 'rgba(255,255,255,1)', 'hsl(0,100%,100%)', or 'white'
function toRGBA(c) {
    var can = document.createElement('canvasdummy'),
        ctx = can.getContext('2d');
    can.width = can.height = 1;
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1); //paint the canvas
    var img = ctx.getImageData(0, 0, 1, 1),
        data = img.data,
        rgba = {
            r: data[0], //0-255 red
            g: data[1], //0-255 green
            b: data[2], //0-255 blue
            a: data[3]  //0-255 opacity (0 being transparent, 255 being opaque)
        };
    return rgba;
}
