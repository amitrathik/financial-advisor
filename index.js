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
getTransactions().then((transactions)=>{
	// sort transactions, first by year, then by month
	// we need to create an index of years to model the new array like : {'2021' : [...], '2022' : [...]}
	// return groupByYear(transactions);

	// get 2021 transactions
	const transactionsFor2021 = {
		transactions : [],
		startingBalance : 0,
		endingBalance:0
	};
	for(let i = 0; i < transactions.length; i++){
		if(new Date(transactions[i].PostingDate).getFullYear() == '2021'){
			transactionsFor2021.transactions.push(transactions[i])
		}
	}
	// sort in asc order
	transactionsFor2021.transactions.sort(function(a,b){
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(a.PostingDate) - new Date(b.PostingDate);
	  });
	const total = transactionsFor2021.transactions.length;
	transactionsFor2021.startingBalance = transactionsFor2021.transactions[0].Balance;
	transactionsFor2021.endingBalance = transactionsFor2021.transactions[total-1].Balance;
	console.log(transactionsFor2021);

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
