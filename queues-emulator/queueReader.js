const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const chokidar = require('chokidar');

const queuesLocation =  __dirname + '/queues';

const registerToQueue = (queueName, processCallback) => {
    const queuePath = path.join(queuesLocation, queueName);
    chokidar.watch(queuePath).on('all', async (event, path) => {
        if(event === "add") {            
            try {
                console.log("Message added to queue - " + path);
                const data = await fsp.readFile(path, 'utf8');
                await processCallback(data);
                await fsp.unlink(path);
            } catch(error) {
                console.log(`Failed to process message ${path} - ${error}`);
            }
        }
    });    
}

module.exports = {
    registerToQueue
}