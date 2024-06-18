var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const routerCartoes = require('./routes/routerCartoes');
const routerapidocs = require ('./routes/apiRoutes')
const connectDB = require('./config/db');


var app = express();

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));7
app.use('/api/cartoes', routerCartoes);
app.use('/api/docs', routerapidocs);
app.use(cookieParser());

module.exports = app;
