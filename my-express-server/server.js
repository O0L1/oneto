import express from "express"
import fs from "fs"
import bodyParser from "body-parser"
import { dirname } from 'path';
import path from 'path'; 
import { fileURLToPath } from 'url';
import cors from "cors"  // Add this import
const app = express();

import images from './database.js';

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies in requests
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '20mb' })); 

// Sample route to test the server
app.get('/api/data', (req, res) => {
    console.log(images);
    res.send(images)
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.post('/api/data', (req, res) => {
    const newData = req.body;

    let date = new Date
    date =` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    images[0].images[date]={
        "URL":newData["URL"],
        "Title":newData["Title"],
        "Description":newData["Description"]
    }

    
    const fileContent = `const images = ${JSON.stringify(images, null, 2)};\n\nexport default images;`;

    console.log(fileContent)
    fs.writeFile('./database.js',fileContent, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error writing file' });
        }
        res.json({ message: 'Data updated successfully' });
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});