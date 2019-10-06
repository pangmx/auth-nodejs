// main starting point of the server

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

// DB setup, creating a new auth DB
mongoose.connect('mongodb://localhost:27017/auth');

// App setup
// pass all incoming requests through the middleware morgan and bodyParser
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}))
router(app);

// Server setup
const port = process.env.PORT || 3090;
// creates a server that listens for http requests and forward to the app instance
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: '+port);