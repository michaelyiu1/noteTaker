const express = require('express');
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Get Route for homepage 
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))   
);

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);




