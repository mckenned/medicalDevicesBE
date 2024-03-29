var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var analysisRouter = require('./routes/analysis');
var measurementRouter = require('./routes/measurement');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/analysis', analysisRouter);
app.use('/api/v1/measurement', measurementRouter);

// setup connection to mongo
const mongoose = require('mongoose');
const DB_URL = (process.env.DB_URL || 'mongodb://localhost/test');
console.log("Connecting to db: %s", DB_URL)

mongoose.connect(DB_URL)
const db = mongoose.connection
console.log("Connected to db")

// recover from errors
db.on('error', console.error.bind(console, 'db connection error'));

module.exports = app;
