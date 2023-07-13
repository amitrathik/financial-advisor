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
