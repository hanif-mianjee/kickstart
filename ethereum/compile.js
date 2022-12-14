const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'UTF-8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contact in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contact.replace(':', '') + '.json'),
        output[contact]   
    );
}