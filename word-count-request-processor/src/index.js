import dotenv from 'dotenv';
import uuid from 'uuid';
import queueReader from '../../queues-emulator/queueReader';
import queueWriter from '../../queues-emulator/queueWriter';
import {handleSimpleText, handleTextFromUrl} from './requestProcessor';

dotenv.config();

console.log("Start word-count-request-processor");

queueWriter.initQueue(process.env.TXT_TO_COUNT_QUEUE);

queueReader.registerToQueue(process.env.WORD_COUNT_REQUEST_QUEUE, async (data) => await processMessage(data));

const processMessage = async (data) => {
    console.log("Processing message - " + data);
    
    const request = JSON.parse(data);
    if(request.hasOwnProperty('value')) {
        await handleSimpleText(request.value);
    } else if(request.hasOwnProperty('file')){
        await handleTextFromUrl(request.file);
    } else if(request.hasOwnProperty('url')){
        await handleTextFromUrl(request.url);
    }
}