const express = require('express');
const app = express();

//import modular route for notes
const notesRouter = require('./notes');
app.use('/notes', notesRouter);

module.exports = app;