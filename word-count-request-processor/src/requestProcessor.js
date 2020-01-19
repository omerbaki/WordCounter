import fs from 'fs';
import https from 'https';
import uuid from 'uuid';
import queueWriter from '../../queues-emulator/queueWriter';

export const handleSimpleText = async (text) => {
    await queueWriter.writeMessage(process.env.TXT_TO_COUNT_QUEUE, text);
}

export const handleTextFromUrl = async (urlPath) => {
    // TODO: be able to retry process file if failed in the middle of stream
    console.log("Start processing file - " + urlPath);
    return new Promise((resolve, reject) => {
        const req = https.request(urlPath, (res) => {
            res.on('data', async (chunk) => {
                try {
                    await queueWriter.writeMessage(process.env.TXT_TO_COUNT_QUEUE, chunk);
                } catch (error) {
                    reject(error);
                }
            });

            res.on('end', () => {
                console.log("Finished processing file");
                resolve();
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}