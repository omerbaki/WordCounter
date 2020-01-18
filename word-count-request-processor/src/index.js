import dotenv from 'dotenv';
import uuid from 'uuid';
import queueReader from '../../queues-emulator/queueReader';
import queueWriter from '../../queues-emulator/queueWriter';
import {handleSimpleText} from './message-handlers/simpleTextHandler';

dotenv.config();

queueWriter.initQueue(process.env.WORD_COUNT_JOB_QUEUE);

queueReader.readMessagesFromQueue(process.env.WORD_COUNT_REQUEST_QUEUE, async (data) => await processMessage(data));

const processMessage = async (data) => {
    console.log("Processing message - " + data);
    
    const request = JSON.parse(data);
    if(request.hasOwnProperty('value')) {
        await handleSimpleText(request.value);
    } else if(request.hasOwnProperty('file')){

    } else if(request.hasOwnProperty('url')){

    }
}