const notes = require('express').Router();
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils.js');

//GET route for retrieving notes
notes.get('/', (req,res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


//GET Route for a specific note
notes.get('/:note_id', (req,res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((notes) => notes.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

//POST Route for submitting new note
notes.post('/', (req,res) => {
    const {title, text} = req.body;

    if (req.body) {
        const newNote = { title, text};
        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully`);
    }
    else {
        res.error('Error in adding note');
    }

})

module.exports = notes;