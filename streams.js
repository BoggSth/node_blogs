const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data', (chunk)=>{
    console.log('----NEW CHUNK-------');
   // console.log(chunk); //buffer stream
   //console.log(chunk.toString()); //readable format
   console.log(chunk); //do not have use toString() if we use encodingno

   writeStream.write('\nNEW CHUNK\n');
   writeStream.write(chunk);
});

//piping
//readStream.pipe(writeStream); //easy way