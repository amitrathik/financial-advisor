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

// Objects and Models
const creditCards = require('./data/creditcards/credit_cards');

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

// establishing starting point with primary acct 8717
// starts with 10/04/2021

// need to establish standing point with credit card balances relative with that date

// I will have to look at the statement for 5550 to determine balance as of ~10/04/2021
// I will also check 0529
// I don't think I got 1864 until ~11/2021 
// for 5550(2976), I'd like to calculate the balance based on the transactions, but i'll also grab it from the statement just to double-check the math

function getCard(cardNumber = '2976'){
	// find credit card by card number
	return creditCards.find((card) => {
		return card.currentEndingNumber == cardNumber || card.formerEndingNumbers.includes(cardNumber);
	})
}

const card = getCard();
const transactions = getAccountData('2976').then((transactions) => {
	// based on card model, calculate the balance for each statement 
	// i can use the opening and closing date
	// basically I want to determine what the balance is for this card around 10/2021 
	return transactions;

});
// i have two files in activities for this card, i know there is some overlap, maybe I can merge the two records
// for simplicity I might just focus on 2976 for now.


// TODO find all credit card payments from primary acct = PERSONAL CHK 8717
// Should have description something like "Payment to BANK card ending in #### MM/DD"
// From this information we can use the card # (and bank) to find transactions for the card
// what's the best way to look for a phrase with JSON.
// maybe includes("Payment to") || ("Payment from") to start
// then reading the desription, possibly breaking it into an array based on the template above
// so it would be like ["Payment to/from", "(BANK) card", "ending in ####"] 
// with this we can determine the direction of the money // although Credit and Debit would also help with that as well
// then to which card by bank and #### 
// not sure if this is how all CC transactions are treated or just Chase accts. will proceed accordingly





// TODO find all money transfers from/to people (CK, KR)
// Should have description something like "Zelle payment from/to PERSON NAME TRANSACTION_ID"
// Well this specific for Chase, using Zelle to transfer between Chase customers
// Another description could be "Online transfer to/from CHK ...#### transaction#: TRANSACTION_ID MM/DD"
// This describes money transfered between different CHK accts within Chase
// This won't cover all the transactions but it will handle a decent chunk of them

// Sorting out the CC transactions will be another task in itself



// API Endpoints
// s

// // Server-Rendered Front End
// // set the view engine to ejs
// app.set('view engine', 'ejs');
// app.use('/public',express.static(__dirname + '/public'));
// // use res.render to load up an ejs view file
// // index page
// app.get('/ui', async function(req, res) {
// 	const data = await getAccountData();
//   	res.render('pages/index', {data: data});
  
// });

// // // Setting the server to listen at port 3000
// app.listen(3000, function(req, res) {
// 	console.log("Server is running at port 3000");
// });
