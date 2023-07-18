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
const getActivity = require('./functions/getActivity');
const getTransactions = require('./functions/getTransactions');
const sortTransactions = require('./functions/sortTransactions');
const calculateBalance = require('./functions/calculateBalance');
const getCard = require('./functions/getCard');
const getAccountData = require('./functions/getAccountData');

// Requiring express in our server
const express = require('express');
const app = express();

const card = getCard();
// generates monthly account summary
function getAccountSummary(){
	return getAccountData('2976').then((transactions) => {
		// based on card model, calculate the balance for each statement 
		// i can use the opening and closing date
		// basically I want to determine what the balance is for this card around 10/2021 
		
		// get all transactions starting from 01/04/2021 ending before 02/04/2021
		const startDate = new Date('02/04/2021');
		const endDate = new Date('03/04/2021');

		const transactionsInRange = [];
		const paymentsOrCredits = [];
		const purchases = [];
		transactions.map((transaction) => {
			const transactionDate = new Date(transaction.TransactionDate);
			// grab the transactions within the timeframe
			if((transactionDate >= startDate && transactionDate < endDate)){
				transactionsInRange.push(transaction);
			}
		})

		transactionsInRange.map((transaction) => {
			// grab the transactions going in(positive # means payments or credits)
			if(transaction.Description.includes('Payment Thank You-Mobile') || parseFloat(transaction.Amount) > 0 ){
				paymentsOrCredits.push(transaction);
			}else{
				purchases.push(transaction);
			}
		})
		console.log(transactionsInRange.length, paymentsOrCredits.length, purchases.length)
		console.log("payments or credits: ", calculateBalance(paymentsOrCredits), "purchases: ", calculateBalance(purchases));

		const newBalance = card.previousBalance - (calculateBalance(paymentsOrCredits) + calculateBalance(purchases));
		console.log(newBalance)
		return transactions;
	})
}



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

// Transactions
app.get('/api/transactions/:accountNumber', async (req,res) =>{
	const data = await getAccountData(req.params.accountNumber);
	res.json(data)
})



// Server-Rendered Front End
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/public',express.static(__dirname + '/public'));
// use res.render to load up an ejs view file
// index page
app.get('/ui/transactions/:accountNumber', async function(req, res) {
	const data = await getAccountData(req.params.accountNumber);
  	res.render('pages/index', {transactions: data});
  
});

// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
	console.log("Server is running at port 3000");
});
