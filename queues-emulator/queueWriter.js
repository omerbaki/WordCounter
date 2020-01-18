const fs = require('fs');
const path = require('path');

const queuesLocation =  __dirname + '/queues';

const initQueue =  (queueName) => {
    const queuePath = path.join(queuesLocation, queueName);
    if (!fs.existsSync(queuePath)) {
        console.log("Create queue - " + queueName);
        fs.mkdirSync(queuePath);
    }
}

const writeMessage = async (queueName, messageName, messageStr, callback) => {
    const messageFullPath = path.join(queuesLocation, queueName, messageName);
    await fs.writeFile(messageFullPath, messageStr, 'utf8', callback);
}

module.exports = {
    initQueue,
    writeMessage
}