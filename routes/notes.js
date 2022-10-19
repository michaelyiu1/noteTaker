const notes = require('express').Router();
const {readAndAppend, readFromFile} = require('../helpers/fsUtils.js');


//GET route for retrieving notes
notes.get('/', (req,res) => {
    readFromFile('./db/notes.json').then((data) => 
    res.json(JSON.parse(data)));
});

//POST Route for submitting new note
notes.post('/', (req,res) => {
    const note = req.body;
    
})
