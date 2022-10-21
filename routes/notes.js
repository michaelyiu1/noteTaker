//Import framework and other tools
const notes = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils.js');
const {v4: uuidv4} = require('uuid');

//GET route for retrieving notes
notes.get('/', (req,res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

//GET Route for a specific note
notes.get('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((notes) => notes.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

//POST Route for submitting new note
notes.post('/', (req,res) => {
    const {title, text, id} = req.body;

    if (req.body) {
        const newNote = { title, text, id: uuidv4()};
        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully`);
    }
    else {
        res.error('Error in adding note');
    }

});

//DELETE Route for a specific note
notes.delete('/:id', (req,res) =>{
    const noteId = req.params.id;
    readFromFile('./db/notes.json',)
        .then((data) => JSON.parse(data))
        .then((json) => {
            
            //create a new array of all notes except the one with the ID provided
            const result = json.filter((note) => note.id !== noteId);

            //save the array to the json
            writeToFile('./db/notes.json', result);

            //respond to the delete request
            res.json(`Note ${noteId} has been deleted`);
        })
});


module.exports = notes;