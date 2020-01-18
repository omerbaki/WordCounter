import uuid from 'uuid';
import queueWriter from '../../../queues-emulator/queueWriter';

export const handleSimpleText = async (text) => {
    const requestMessageName = uuid() + ".txt";
    await queueWriter.writeMessage(process.env.WORD_COUNT_JOB_QUEUE, requestMessageName, text);
}