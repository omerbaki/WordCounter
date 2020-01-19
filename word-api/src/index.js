import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import uuid from 'uuid';

import db from '../../document-db-emulator/db';
import queueWriter from '../../queues-emulator/queueWriter';

dotenv.config();

queueWriter.initQueue(process.env.WORD_COUNT_REQUEST_QUEUE);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/word-stats', async (req, res) => {
    let dbData = JSON.parse(await db.read());
    const word = req.query.word;
    const wordCount = dbData.hasOwnProperty(word)? dbData[word] : 0;

    res.status(200).send(wordCount.toString());
});

app.post('/word-counter', async (req, res) => {
    if (!req.body.hasOwnProperty('value') &&
        !req.body.hasOwnProperty('file') &&
        !req.body.hasOwnProperty('url')) {
            return res.status(400).send("Body should contain one of the following properties: value, file, url")
    }

    try {
        await queueWriter.writeMessage(process.env.WORD_COUNT_REQUEST_QUEUE, JSON.stringify(req.body));
        res.sendStatus(200);
    } catch(error) {
        console.log("Failed to process request - " + error);
        res.status(500).send("Server failed to process request")
    }
});

app.listen(process.env.PORT, () =>
    console.log(`WordApi listening on port ${process.env.PORT}!`),
);