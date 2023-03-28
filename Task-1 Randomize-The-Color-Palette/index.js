let fs = require('fs');

//2. Read the JSON file as a JSON array from the filesystem using the core `fs` module
fs.readFile("color_palette.json", 'UTF-8', (err, data)=>{
    if(err){
        console.log("File read unsuccessful");
        throw err;
    }
    colors_data = JSON.parse(data);

    console.log("-------------------------------------------------------");
    //3. Randomize the color palette and take 5 colors
    colors_data_5 = [];
    for(let i=0;i<5;i++){
        colors_data_5[i] = colors_data[Math.floor(Math.random()*colors_data.length)];
    }
    console.log(colors_data_5);

    console.log("-------------------------------------------------------");
    //4. Programmatically create a new file `randomized_color_ palette.json` in your filesystem and write the randomized 5 colors into that file
    fs.writeFileSync("newFile.json", JSON.stringify(colors_data_5), err=>{
        if(err){
            console.log("File write unsuccessful..");
            throw err;
        }
        console.log("File written Successfully.. ")
    });

    console.log("-------------------------------------------------------");
    //5. Read the newly created `randomized_color_ palette.json` again in the same NodeJS program and print those 5 colors in the console
    fs.readFileSync("newFile.json", 'UTF-8', (err, data)=>{
        if(err){
            console.log("File read unsuccessful");
            throw err;
        }
        file_content = JSON.parse(data);

        console.log(file_content);

    });
});
