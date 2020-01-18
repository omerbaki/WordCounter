const fs = require('fs');
const path = require('path');

const queuesLocation =  __dirname + '/queues';

const readMessagesFromQueue = async (queueName, processCallback) => {
    const queuePath = path.join(queuesLocation, queueName);
    var files = fs.readdirSync(queuePath);

    files.forEach(async file  => {
        fs.readFile(path.join(queuePath, file), 'utf8', (err, data) => processCallback(err, data));
    })
}

module.exports = {
    readMessagesFromQueue,
}