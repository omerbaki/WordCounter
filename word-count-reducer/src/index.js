import dotenv from 'dotenv';
import queueReader from '../../queues-emulator/queueReader';

dotenv.config();

const reduce = async () => {
    let finalCount = {}; // READ FROM DB
    await queueReader.readMessagesFromQueue(process.env.COUNTED_WORDS_QUEUE, async (countedWordsStr) => {
        if (!countedWordsStr) return;

        const countedWords = JSON.parse(countedWordsStr);
        Object.keys(countedWords).reduce((prev, nxt) => {
            prev[nxt] = (prev[nxt] + countedWords[nxt]) || countedWords[nxt];
            return prev;
        }, finalCount);

        console.log("mid finalCount - " + JSON.stringify(finalCount));
    });

    console.log("finalCount - " + JSON.stringify(finalCount));
}

(async () => await reduce())();