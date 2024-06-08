//import modules
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
    res.render('init');
});


//server 
app.listen(port, (error)=> {
    if(error){
        console.log('Erro ao executar');
    }
    console.log("Site no ar... vambora");
});