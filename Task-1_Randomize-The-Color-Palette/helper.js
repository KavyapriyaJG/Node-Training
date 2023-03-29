const {readFileSync, readFile} = require('fs');

const readTheFile = async(file, randomLimit) => {
    return new Promise((resolve,reject) => {
        readFile(file,'UTF-8',(err,data) => {
            if(err){
                console.log(err);
                reject("File Not Found !..");
            }
            else{
                let colors = JSON.parse(data);
                if(colors.length < randomLimit)
                    reject("File does not have required Number of colors!..");
                else
                    resolve(data);
            }
        });
    }).then(
        (data) => {
            return data;
        }
    );
}

module.exports = {readTheFile};