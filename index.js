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
// Functions
const convertCSVToJSON = require('./functions/convertCSVToJSON');
const groupByYear = require('./functions/groupByYear');
const getActivity = require('./functions/getActivity');
const getTransactions = require('./functions/getTransactions');
const sortTransactions = require('./functions/sortTransactions');
// Requiring express in our server
const express = require('express');
const app = express();


async function getAccountData (accountNumber = '8717'){ 
	return getActivity(accountNumber).then((fileName) => {
		return getTransactions(fileName);
	}).then((transactions) => {
		return sortTransactions('2021', convertCSVToJSON(transactions));
	})
}

// const results = await getAccountData('1864');

// console.log(results);

// TODO find all credit card payments from primary acct = PERSONAL CHK 8717
// Should have description something like "Payment to BANK card ending in #### MM/DD"
// From this information we can use the card # (and bank) to find transactions for the card

// TODO find all money transfers from/to people (CK, KR)
// Should have description something like "Zelle payment from/to PERSON NAME TRANSACTION_ID"
// Well this specific for Chase, using Zelle to transfer between Chase customers
// Another description could be "Online transfer to/from CHK ...#### transaction#: TRANSACTION_ID MM/DD"
// This describes money transfered between different CHK accts within Chase
// This won't cover all the transactions but it will handle a decent chunk of them

// Sorting out the CC transactions will be another task in itself



// API Endpoints
app.get('/api', async function(req, res) {
	const data = await getAccountData('1864');
	res.json(data);
});

// Server-Rendered Front End
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/public',express.static(__dirname + '/public'));
// use res.render to load up an ejs view file
// index page
app.get('/ui', async function(req, res) {
	const data = await getAccountData();
  	res.render('pages/index', {data: data});
  
});

// // Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
	console.log("Server is running at port 3000");
});
