//Creating a HTTP server

let http = require('http');
let fs = require('fs');

let data = fs.readFileSync('assets/data/color_palette.json');
let color_palette_5 = [];
let colors = JSON.parse(data);

for (let i = 0; i < 5; i++) {
    color_palette_5.push(colors[Math.floor(Math.random() * colors.length)]);
}

http.createServer((req, res, err)=>{

    if(err)
        console.log("Error occured in creating server");

    if(req.url != '/favicon.ico'){
        res.write("Server up!\nResponse returned to browser...\n\n");

        res.write(JSON.stringify(color_palette_5));
        res.end();
    }
}).listen(4000);