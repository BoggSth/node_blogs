const fs = require('fs');

fs.readFile('./docs/blog1.txt', (err, data)=>{
    if(err){
        console.log(err);
    }
    console.log(data); //gives buffer
    console.log(data.toString()); //gives readable format
});

console.log('last line');