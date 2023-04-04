const {randomSplice} = require('random-splice');

let fs = require('fs');

let data = fs.readFileSync('assets/color_palette.json');
let color_palette_5 = [];
let colors = JSON.parse(data);

for (let i = 0; i < 5; i++) {
    color_palette_5.push(randomSplice(colors));
}

console.log(color_palette_5);
