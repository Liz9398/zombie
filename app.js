var express = require('express');
var mongoose = require('mongoose');

var path =require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');

var routes = require('./routes');
var passportsetup = require("./passportsetup")
var app = express();

mongoose.connect("mongodb://lizeth:Lizeth-98@ds163781.mlab.com:63781/zombies");

passportsetup();

app.set('port', process.env.PORT || 3000);

app.set('views', path.resolve(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:'TKRV0lrgljphwc<<sprm',
    resave:true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize({
    userProperty: "zombie"
}));
app.use(passport.session());

app.use(routes);

app.listen(app.get('port'),()=>{
    console.log('La aplicacion inicio por el puerto' + app.get('port'));
});
