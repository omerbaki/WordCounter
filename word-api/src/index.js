import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import uuid from 'uuid';

import queueWriter from '../../queues-emulator/queueWriter';

dotenv.config();

queueWriter.initQueue(process.env.REQUEST_PROCESS_QUEUE);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/word-stats', async (req, res) => {
    res.sendStatus(200);
});

app.post('/word-counter', async (req, res) => {
    if (!req.body.hasOwnProperty('value') &&
        !req.body.hasOwnProperty('file') &&
        !req.body.hasOwnProperty('url')) {
            return res.status(400).send("Body should contain any of the following properties: value, file, url")
    }

    const requestMessageName = uuid() + ".json";
    await queueWriter.writeMessage(process.env.REQUEST_PROCESS_QUEUE, requestMessageName, JSON.stringify(req.body), (error) => {
        if(error) {
            res.status(500).send("Server failed to process request")
        } else {
            res.sendStatus(200);
        }
    })
});

app.listen(process.env.PORT, () =>
    console.log(`WordApi listening on port ${process.env.PORT}!`),
);