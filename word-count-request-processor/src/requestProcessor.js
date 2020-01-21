import fs from 'fs';
import https from 'https';
import uuid from 'uuid';
import "regenerator-runtime/runtime";
import queueWriter from '../../queues-emulator/queueWriter';
import ChunksFixer from './chunksFixer';

export const handleSimpleText = async (text) => {
    await queueWriter.writeMessage(process.env.TXT_TO_COUNT_QUEUE, text);
}

export const handleTextFromUrl = async (urlPath) => {
    // TODO: be able to retry process file if failed in the middle of stream
    console.log("Start processing file - " + urlPath);
    const chunksFixer = new ChunksFixer();
    return new Promise((resolve, reject) => {
        const req = https.request(urlPath, (res) => {
            res.on('data', async (chunk) => {
                try {
                    const fixedChunk = chunksFixer.fixLastWord(chunk);
                    await queueWriter.writeMessage(process.env.TXT_TO_COUNT_QUEUE, chunk);
                } catch (error) {
                    reject(error);
                }
            });

            res.on('end', async () => {
                const lastWord = chunksFixer.getPrevChunkLastWord();
                if(lastWord && lastWord.length > 0) {
                    await queueWriter.writeMessage(process.env.TXT_TO_COUNT_QUEUE, lastWord);
                }
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