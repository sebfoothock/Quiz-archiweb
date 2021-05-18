//Importer express
let express = require('express');
require('dotenv').config();

//Initialisation de l'app
let app = express();

//Récupérer un élément dans l'URL lors d'une requête
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Eviter des problèmes avec les requêtes
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//Les routes 
let router = require('./routes');
app.use('/', router);

//Lancer l'application sur le port 4000
app.listen(4000, function () {
    console.log('Running on port 4000');
})