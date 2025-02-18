const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');

const PORT = 3000;

const contentMap = new Map();
contentMap.set('html', 'text/html');

const app = express();

app.use(handleRequest);

async function handleRequest(req, res) {
    const filepath = "./index.html"; //req.url.slice(1) ? "." + req.url : 
    console.log('filePath 1: ' + filepath);
    try {
        const file = await fs.readFile(path.join(process.cwd(), filepath));
        console.log("filePath 2: " + file);
        console.log('arr: ' + filepath.split("."))
        const ext = filepath.split(".").at(-1);
        console.log("ext: " + ext)
        if (!ext || !contentMap.has(ext)) {
            res.writeHead(404);
            res.end();
        }
        else {
            res.setHeader("Content-Type", contentMap.get(ext));
            res.send(file);
            res.end();
        }
    }
    catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end();
    }
}

app.listen(PORT, ()=> console.log(`htmlServer running on port: ${PORT}`));