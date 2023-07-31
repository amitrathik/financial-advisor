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
const calculateBalance = require('./functions/calculateBalance');
const getCard = require('./functions/getCard');
const getAccountData = require('./functions/getAccountData');

// Requiring express in our server
const cors = require("cors");
const express = require('express');
const app = express();
//Enable cors
app.use(cors());

const card = getCard();
// generates monthly account summary
const accountSummaries = [];
let balance =  card.previousBalance;
function generateReport(){
	return getAccountData('2976').then((transactions) => {
		// based on card model, calculate the balance for each statement 
		// i can use the opening and closing date
		// basically I want to determine what the balance is for this card around 10/2021 
		
		// get all transactions starting from 01/04/2021 ending before 02/04/2021
		const transactionsInRange = sortTransactions({startDate : '01/04/2021', endDate : '12/04/2021'}, transactions);
		const paymentsOrCredits = [];
		const purchases = [];


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

		balance -= (calculateBalance(paymentsOrCredits) + calculateBalance(purchases));
		console.log(balance)
		return transactions;
	})
}

function sortTransactions(query = {}, transactions = []){

	const startDate = new Date(query.startDate);
	const endDate = new Date(query.endDate);
	const results = [];
	transactions.map((transaction) => {
		const transactionDate = new Date(transaction.TransactionDate);
		// grab the transactions within the timeframe
		if((transactionDate >= startDate && transactionDate < endDate)){
			results.push(transaction);
		}
	})

	return results;
}


// API Endpoints

// Accounts
app.get('/api/accounts/', async (req,res) =>{
	const accounts = [{
		bank : 'Chase',
		type : 'checking',
		name : 'Chase Checking and Savings',
		endingNumber : '8717',
		formerEndingNumbers : ['9687'],
	},{
		bank : 'Chase',
		type : 'card',
		name : 'Chase Freedom',
		endingNumber : '7089',
		formerEndingNumbers : ['2976','5550'],
	},{
		bank : 'Chase',
		type : 'card',
		endingNumber : '6086',
		formerEndingNumbers : ['1864'],
		name : 'Chase Freedom Unlimited',
	}]

	res.json(accounts)
})

// Transactions
app.get('/api/transactions/:accountNumber', async (req,res) =>{
	console.log(req.query)
	const data = await getAccountData(req.params.accountNumber);
	if(req.query.startDate && req.query.endDate){
		const results = sortTransactions({startDate: req.query.startDate, endDate : req.query.endDate}, data);
		res.json(results)
	}

	res.json(data)
})


// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
	console.log("Server is running at port 3000");
});
