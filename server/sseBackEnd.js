const express = require('express');
const cors = require('cors');

const PORT = 3001;

const app = express();
app.use(cors());

app.get("/", (req, res) => res.send('Hello'));

app.get("/progress", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();

    let cntr = 0;
    console.log('\n********************************entering setProgress call***************************************\n');
    sseProgress(res,cntr);
    console.log('\n********************************exiting setProgress call****************************************\n');
    
    
    
});

function sseProgress(res, cntr,progress=0) {

    console.log(`\n******************************** Entering Counter: ${cntr}***************************************\n`)
    let newProgress = Math.min(progress + Math.random()*10, 100);
    console.log(`\nnewProgress: ${newProgress}\n`);
    res.write(`event: progress\n`);
    res.write(`id: ${Math.round(newProgress)}\n`);
    res.write(`data: ${Math.floor(newProgress)}%\n\n`);
    console.log(`\nnewProgress: ${newProgress}\n`);
    console.log(`\n********************************Exiting Counter: ${cntr}***************************************\n`);
    cntr++;
    if(newProgress >= 100) {
        res.write(`event: done\n`);
        res.write(`data: 100% complete!\n\n`);
        console.log('data: 100% complete!\n\n');
        res.end();
    } else {
        console.log(`\nsetInterval newProgress: ${newProgress}\n`);
        setTimeout(() => sseProgress(res, cntr, newProgress), 1000);
    }
}

app.listen(PORT, () => console.log(`sseBackEnd.js running on PORT: ${PORT}.`));