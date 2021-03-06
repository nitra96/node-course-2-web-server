const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
     var now = new Date().toString();    
     var log = `${now}: ${req.method} ${req.url}`;
    
     console.log(log);  
     fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
        console.log('Unable to append to server.log.');
    }
})    
    next();
})

app.use((req, res, next)=> {
 app.get('/maintenance', (req, res) =>{
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        currentYear: new Date().getFullYear()
    });
});   
    
    
     var now = new Date().toString();    
     var log = `${now}: ${req.method} ${req.url}`;
    
     console.log(log);  
     fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
        console.log('Unable to append to server.log.');
    }
})    
    next();
})




hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {
   return text.toUpperCase()
});

app.get('/', (req, res) =>{
//   res.send( '<h1>Hello!</h1>'); 
//    res.send({
//       name: 'Fisa',
//       likes: [
//       ' swimming',
//        'eating'
//        ]    
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome',
        currentYear: new Date().getFullYear()
    
    });
});



app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req, res)=>{
 res.send({
     error:'UNABLE TO FULFIL REQUEST'
 });   
});

app.listen(3000, ()=>{
    console.log('Server is up to port'); 
});