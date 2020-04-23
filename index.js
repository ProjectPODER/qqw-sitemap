const { getPersonIDs, getCompanyIDs, getInstitutionIDs, getCountryIDs } = require('./lib/db');
const { buildSitemaps } = require('./lib/generator');
const monk = require('monk');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'database', alias: 'd', type: String },
    { name: 'host', alias: 'h', type: String },
    { name: 'port', alias: 'p', type: String }
];

const args = commandLineArgs(optionDefinitions);

if(!args.database ) {
    console.log('ERROR: missing parameters.');
    process.exit(1);
}

let host = args.host;
if(!host) host = 'localhost';
let port = args.port;
if(!port) port = '27017';

const url = 'mongodb://' + (args.host ? args.host : 'localhost') + ':' + (args.port ? args.port : '27017') + '/' + args.database;
const db = monk(url)
.then( (db) => {
    console.log('Connected to ' + args.database + '...');

    let personPromise = getPersonIDs(db);
    let companiesPromise = getCompanyIDs(db);
    let institutionPromise = getInstitutionIDs(db);
    let countryPromise = getCountryIDs(db);

    return Promise.all([personPromise, companiesPromise, institutionPromise, countryPromise]);
} )
.then( (results) => {
    let xmlFiles = buildSitemaps(results);

    xmlFiles.map(file => {
        fs.writeFileSync('./' + file.filename, file.text);
    });

    console.log('Success!');
    process.exit(0);
} )
.catch( (err) => { console.log('Error:', err); process.exit(1); } );
