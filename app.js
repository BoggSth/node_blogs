const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://boggShrestha:mounT357@boggmongodb.grcfe.mongodb.net/boggMongoDb?retryWrites=true&w=majority&appName=boggMongoDb' ;
mongoose.connect(dbURI)
    //.then((result)=> console.log('connected to db'))
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

//register view engine ejs
app.set('view engine', 'ejs');
app.set('views', 'myviews');

//listen for requests
//app.listen(3000);



//middleware and static files
app.use(express.static('public'));

//middleware for webpage
app.use(express.urlencoded({extended: true}));

/** 
//using morgan middleware
app.use(morgan('dev')); 
**/

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'new Blog',
        snippet: 'about my new Blog',
        body: 'MORE ABOUT MY new Blog'
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
});

//finds all the documents
app.get('/all-blogs', (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

//find a single object by id
app.get('/single-blog', (req, res)=>{
    Blog.findById("67acc117c4ce33f50c2b15fc")
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

/** 
app.use((req, res, next)=>{
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next(); //This method let the middleware jump to the next middleware command
});

//2nd middleware
app.use((req, res, next)=>{
    console.log('in the next middlewar showing an example');
    next();
});
**/

app.get('/', (req, res)=>{
    
    const blogs = [
        
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        
    ];
    
    res.render('index', {title: 'Home', blogs});
});

//blog routes
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1}) //-1 means descending order
        .then((result)=>{
            res.render('index', {title: 'All Blogs', blogs: result});    
        })
        .catch((err)=>{
            console.log(err);
        });
});

//POST Handler
app.post('/blogs', (req, res)=>{
    //console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
});

//get handler with id
app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    //console.log(id); //check out the id it brings in when console log
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {blog: result, title: 'Blog Details'});
        })
        .catch((err)=>{
            console.log(err);
        });
})

//DELETE HANDLER
app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/blogs'})
        })
        .catch((err)=>{
            console.log(err);
        });
});


app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
});

app.get('/create', (req, res)=>{
    res.render('create', {title: 'Create a new Blog'});
});

app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
});

/** 
//get request for HOMEPAGE
app.get('/', (req, res)=>{
   // res.send('<p>hello, world<p>');
   res.sendFile('./views/index.html', {root: __dirname});
});

//ABOUT page
app.get('/about', (req, res)=>{
    res.sendFile('./views/about.html', {root: __dirname});
});

//REDIRECTS
app.get('/about-us', (req, res)=>{
    res.redirect('/about'); 
}); 

//404 error page. This line of code must be placed at the end of the page so that it is executed at last.
//Otherwise. It will create wrong output if you use in the front or middle part of the page.
app.use((req, res)=>{
    res.sendFile('./views/404.html', {root: __dirname});
}); 

**/
