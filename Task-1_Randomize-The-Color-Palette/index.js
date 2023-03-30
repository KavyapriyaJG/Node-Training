const { writeFile } = require('fs');
const { readTheFile } = require('./helper');

async function main() {
    let colorPalette = await readTheFile("color_palette.json");
    console.log(colorPalette, "initial reading..");

    colorPalette = JSON.parse(colorPalette);
    colorsData5 = [];
    for (let i = 0; i < 5; i++) {
        colorsData5[i] = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }
    console.log(colorsData5, "randomising..")

    await writeFile("newFile.json", JSON.stringify(colorsData5), err => {
        if (err) {
            console.log("File write unsuccessful..");
            throw err;
        }
        console.log("File written Successfully.. ")
    });

    const randomColorPalette = await readTheFile("newFile.json", 5);
    console.log(randomColorPalette, "readData..");
}

main();