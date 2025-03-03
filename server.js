const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{

    //lodash example
    const num = _.random(0, 20);
    console.log(num);
   
    //lodash example
    const greet = _.once(()=> {
        console.log('hello');
    });

    greet();
    greet();
    /**
    //sending plainn text
    //set header Content type
    res.setHeader('Content-Type', 'text/plain'); //1st step
    res.write('hello world');//2nd step
    res.end(); //3rd step
    **/

     
    //sending html tag
    //set header Content type
    res.setHeader('Content-Type', 'text/html'); //1st step

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;            
        default:
            path += '404.html';   
            res.statusCode = 404;
            break;     
    }

    //send html file
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
        }else{
        res.end(data); //3rd step
        }
            
    });


    //res.end(); //3rd step
    

    /** 
    //sending through html page
    //set header Content type
    res.setHeader('Content-Type', 'text/html'); //1st step

    res.write('<p>hello world<p>');//2nd step
    res.write('<p>hello world again<p>');

    res.end(); //3rd step
    **/

    
});

server.listen(3000, 'localhost', ()=>{
    console.log('Listening on port 3000..');
});