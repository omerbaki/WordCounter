import dotenv from 'dotenv';
import queueReader from '../../queues-emulator/queueReader';
import db from '../../document-db-emulator/db';

dotenv.config();

const reduce = async () => {
    console.log("start word count reducer");
    let finalCount = JSON.parse(await db.read());
    await queueReader.readMessagesFromQueue(process.env.COUNTED_WORDS_QUEUE, async (countedWordsStr) => {
        if (!countedWordsStr) return;

        const countedWords = JSON.parse(countedWordsStr);
        Object.keys(countedWords).reduce((prev, nxt) => {
            prev[nxt] = (prev[nxt] + countedWords[nxt]) || countedWords[nxt];
            return prev;
        }, finalCount);
    });

    db.write(JSON.stringify(finalCount));
    console.log("Updated word count in DB");
}

(async () => await reduce())();