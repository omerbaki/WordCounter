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

const readMessagesFromQueue = async (queueName, processCallback) => {
    const queuePath = path.join(queuesLocation, queueName);
    var files = fs.readdirSync(queuePath);

    await asyncForEach(files, async (file) => {
        const fileFullPath = path.join(queuePath, file);
        
        try {
            const data = await fsp.readFile(fileFullPath, 'utf8');
            await processCallback(data);
            await fsp.unlink(fileFullPath);
        } catch(error) {
            console.log(`Failed to process message ${file} - ${error}`);
        }
    });
}
    
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    registerToQueue,
    readMessagesFromQueue
}