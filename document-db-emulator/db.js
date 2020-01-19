const fsp = require('fs').promises;
const path = require('path');

const dbLocation =  __dirname + '/db.json';

const read = async () => {
    return await fsp.readFile(dbLocation, 'utf8');
}

const write = async (dataStr) => {
    await fsp.writeFile(dbLocation, dataStr, 'utf8');
}

module.exports = {
    read,
    write
}