const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const queuesLocation =  __dirname + '/queues';

const initQueue =  (queueName) => {
    const queuePath = path.join(queuesLocation, queueName);
    if (!fs.existsSync(queuePath)) {
        console.log("Create queue - " + queueName);
        fs.mkdirSync(queuePath);
    }
}

const writeMessage = async (queueName, messageStr) => {
    const messageName = Date.now() + ".txt";
    const messageFullPath = path.join(queuesLocation, queueName, messageName);
    await fsp.writeFile(messageFullPath, messageStr, 'utf8');
}

module.exports = {
    initQueue,
    writeMessage
}