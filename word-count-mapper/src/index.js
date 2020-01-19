import dotenv from 'dotenv';
import uuid from 'uuid';
import queueReader from '../../queues-emulator/queueReader';
import queueWriter from '../../queues-emulator/queueWriter';

dotenv.config();

queueWriter.initQueue(process.env.COUNTED_WORDS_QUEUE);

queueReader.readMessagesFromQueue(process.env.TXT_TO_COUNT_QUEUE, async (data) => await countWords(data));

const countWords = async (txt) => {
    if(!txt) return;

    const words = txt.split(" ");
    const wordsCount = words.reduce((prev, nxt) => {
        prev[nxt] = (prev[nxt] + 1) || 1;
        return prev;
      }, {});

    await queueWriter.writeMessage(process.env.COUNTED_WORDS_QUEUE, JSON.stringify(wordsCount));
}