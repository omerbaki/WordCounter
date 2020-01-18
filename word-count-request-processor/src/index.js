import dotenv from 'dotenv';
import uuid from 'uuid';
import queueReader from '../../queues-emulator/queueReader';

dotenv.config();

queueReader.readMessagesFromQueue(process.env.REQUEST_PROCESS_QUEUE, (err, data) => processMessage(err, data));

const processMessage = async (err, data) => {
    console.log(data);
}