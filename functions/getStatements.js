const fs = require('fs');
const path = require('path');

const formatTransactions = require('./formatTransactions.js');
// TODO : move to environment variables
const pathToStatements = './data/statements';

// TODO : replace with json file
const creditCards = require('../data/creditcards/credit_cards');

const getStatements = () => {
    // console.log(fs.access(pathToStatements));
    // read directory
    fs.readdirSync(pathToStatements).map(fileName => {
        // match files to cards
        //console.log(fileName.split('_'));
        const JSON = formatTransactions(path.join(pathToStatements, fileName));

        console.log(JSON)
        // loop through JSON break transactions by months, but also by statement periods

        // how to loop through objects? 
        // find value by key
        // parse through value to see if it matches string below
        
        /**
         * 
         * find transactions matching "[mm/dd] Payment To [bank] Card Ending IN [Card Number]"
         * find card activity file in activities
         * find transactions related to that payment cycle
         * 
         */
        
    })
}

getStatements();