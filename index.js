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
const groupByYear = require('./functions/groupByYear');


// Requiring express in our server
const express = require('express');
const app = express();

async function getTransactions(){
	const data = await fs.promises.readFile(path.resolve(file),'utf-8').catch((error) => {
		console.log(error);
	});
	return convertCSVToJSON(data);
}
const transactions = getTransactions().then((transactions)=>{
	// sort transactions, first by year, then by month
	// we need to create an index of years to model the new array like : {'2021' : [...], '2022' : [...]}
	return groupByYear(transactions);
}).catch((err) => {
	console.log(err);
});

// app.get('/', function(req, res) {
// 	getTransactions().then((data) => {
// 		res.json(groupByYear(data));
// 	})
// });

// set the view engine to ejs
// app.set('view engine', 'ejs');
// app.use('/public',express.static(__dirname + '/public'));
// use res.render to load up an ejs view file
// index page
// app.get('/', async function(req, res) {
// 	const transactions = await fs.promises.readFile(path.resolve(file),'utf-8').catch((error) => {
// 		console.log(error);
// 	});
// 	const transactionsJSON = groupByYear(convertCSVToJSON(transactions));
// 	const results = Object.assign({},transactionsJSON)
//   	res.render('pages/index', {transactions: results});
  
// });

// Setting the server to listen at port 3000
// app.listen(3000, function(req, res) {
// 	console.log("Server is running at port 3000");
// });
