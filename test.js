//const name = 'mario';
//console.log(name);

/**
    const greet = (name) => {
        console.log(` hello, ${name}`);
    }

    greet('mario');
    greet('Yoshi');
**/

//console.log(global);

/** 
    global.setTimeout(() => {
        console.log('in the timeout');
        clearInterval(int);
    }, 5000);

    const int = setInterval(() => {
        console.log('in the interval');
    }, 1000);
**/
console.log(__dirname);
console.log(__filename);


}