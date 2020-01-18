import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';

dotenv.config();

const QUEUE_PATH = '../queues/' + process.env.REQUEST_PROCESS_QUEUE;
initQueue();

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
    await fs.writeFile(path.join(QUEUE_PATH, requestMessageName), JSON.stringify(req.body), (error) => {
        if(error) {
            return res.status(500).send("Server failed to process request")
        } else {
            return res.status(200);
        }
    });
});

app.listen(process.env.PORT, () =>
    console.log(`WordApi listening on port ${process.env.PORT}!`),
);

function initQueue() {
    if (!fs.existsSync(QUEUE_PATH)) {
        console.log("Create queue - " + process.env.REQUEST_PROCESS_QUEUEc);
        fs.mkdirSync(QUEUE_PATH);
    }
}
