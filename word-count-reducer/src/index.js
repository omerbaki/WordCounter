import dotenv from 'dotenv';
import 'regenerator-runtime/runtime';
import queueReader from '../../queues-emulator/queueReader';
import db from '../../document-db-emulator/db';

dotenv.config();

const reduceAndUpdateDb = async () => {    
    console.log("start word count reducer");
    let finalCount = JSON.parse(await db.read());
    let dirtyFlag = false;
    await queueReader.readMessagesFromQueue(process.env.COUNTED_WORDS_QUEUE, async (countedWordsStr) => {        
        if (!countedWordsStr) return;

        dirtyFlag = true;
        const countedWords = JSON.parse(countedWordsStr);
        Object.keys(countedWords).reduce((prev, nxt) => {
            prev[nxt] = (prev[nxt] + countedWords[nxt]) || countedWords[nxt];
            return prev;
        }, finalCount);
    });

    if(dirtyFlag) {
        db.write(JSON.stringify(finalCount));
        console.log("Updated word count in DB");
    }
}

setInterval(async() => await reduceAndUpdateDb(), 10000);