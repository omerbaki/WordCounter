import fs from 'fs';
import https from 'https';
import uuid from 'uuid';
import queueWriter from '../../queues-emulator/queueWriter';

export const handleSimpleText = async (text) => {
    const requestMessageName = uuid() + ".txt";
    await queueWriter.writeMessage(process.env.WORD_COUNT_JOB_QUEUE, requestMessageName, text);
}

export const handleTextFromRemoteFile = async (filePath) => {
    console.log("filePath - " + filePath);

    try {
        var req = https.request(filePath, function(res) {
            //res.setEncoding('binary');
            var data = [];
            res.on('data', function(chunk) {
                console.log("chunk - " + chunk);
                // data.push(chunk);
            });
    
            res.on('end', function() {
                console.log("FINISH");
                //fs.appendFileSync(fileName, data);

                // var binary = Buffer.concat(data);
                // var writeStream = fs.createWriteStream(fileName, { "flags": 'a' });
                // writeStream.write(binary);
                // writeStream.end();
            });
    
            res.on('error', function(err){
                console.log("Error during HTTP request");
                console.log(err.message);
            });
        });
        req.end();
    } catch (error) {
        console.log("ERROR - " + error);
    }
}

export const handleTextFromApi = async (url) => {

}