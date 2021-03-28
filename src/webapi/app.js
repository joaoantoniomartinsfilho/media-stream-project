const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.get('/', (req, res) => res.sendFile(__dirname + "/api/home/view/index.html"));

app.get('/video', function(req, res) {
    
    const range = String(req.headers.range);

    if(!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = __dirname + "/resources/videos/prank.mp4";
    const videoFileSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE_FACTOR = 10 ** 6; //1000000 bytes
    const videoChunkSize = 1 * CHUNK_SIZE_FACTOR;

    const startChunkBytes = Number(range.replace(/\D/g, ""));
    const endChunkBytes = Math.min( (startChunkBytes + videoChunkSize), (videoFileSize - 1) );

    const contentLenght = endChunkBytes - startChunkBytes + 1;
    const responseHeaders = {
        "Content-Range": `bytes ${startChunkBytes}-${endChunkBytes}/${videoFileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Lenght": contentLenght,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, responseHeaders);

    const videoStream = fs.createReadStream(videoPath, { start: startChunkBytes, end: endChunkBytes });

    videoStream.pipe(res);
});

app.listen(port, () => console.log(`Application started - port ${port}`));