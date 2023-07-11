/**
 * Import all transactions from CSV file
 * Convert data to JSON for easier usage thru out application
 * 
 * Begin grouping transactions
 * Implement an indexing to group transactions with similar phrases
 * 
 */
const path = require("path");
const fs = require('fs');

const file = './data/activities/Chase8717_Activity_20230710.CSV';


// Functions
const convertCSVToJSON = require('./functions/convertCSVToJSON');

fs.readFile(path.resolve(file),'utf-8', (error, data) => {
	if(error){
		console.log(error);
		return;
	}
	console.log(convertCSVToJSON(data).length)
	// console.table(convertCSVToJSON(data));
});

