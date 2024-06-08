//import modules
const fetch = require('node-fetch');
const {error} = require('console');
const express = require('express');
const port = 8080
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

//app
const app = express();

//body-parse
app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
app.use(bodyParser.json());

//template
app.engine('handlebars', engine({ defaultLayout: 'home' })); 
app.set('view engine', 'handlebars');

//static files

app.use(express.static(__dirname + '/public'));

//routers
app.get('/', function(req, res){
    fetch('http://localhost:3000/client', {method: 'GET'})
    .then(response => response.json())
    .then(response => res.render('init', {data:response}))
});

app.post('/register', function(req, res){
    let name  = req.body.name;
    let idade = req.body.idade;
    let data = {'name': name, 'idade':idade};
    fetch('http://localhost:3000/client', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}

        })
    .then(res.redirect('/'))
});

app.get('/select/:id', function(req, res){
    let id = req.params.id;
    fetch('http://localhost:3000/client'+id, {method: 'GET'})
    .then(response => response.json())
    .then(response => res.render('select', {data: response}))
});



//server 
app.listen(port, (error)=> {
    if(error){
        console.log('Erro ao executar');
    }
    console.log("Site no ar... vambora");
});