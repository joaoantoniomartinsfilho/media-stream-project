const express = require('express')
const app = express()
const port = 3000

const fs = require('fs');

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))

app.get('/video', function(req, res) {
    const rage = req.header.range;
    if(!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = ""

}) 
app.listen(port, () => console.log(`Application started - port 3000`))