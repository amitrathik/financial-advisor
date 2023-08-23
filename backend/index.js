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

// Data
const Accounts = require('./data/accounts/accounts');
const CreditCards = require('./data/accounts/credit_cards');

// Functions
const calculateBalance = require('./functions/calculateBalance');
const getAccountData = require('./functions/getAccountData');

// Requiring express in our server
const cors = require("cors");
const express = require('express');
const app = express();
//Enable cors
app.use(cors());

// API Endpoints

// Accounts
app.get('/api/accounts/', async (req,res) =>{
	res.json(Accounts)
})

// app.get('/api/accounts/:accountNumber', async (req,res) =>{
// 	const data = await getAccountData(req.params.accountNumber);
// 	res.json(data)
// })

// [Credit] Cards
app.get('/api/cards/', async (req,res) =>{
	res.json(CreditCards)
})

// Transactions
// app.get('/api/transactions/', async (req,res) =>{
// 	res.json("get all transactions")
// })
app.get('/api/transactions/:accountNumber', async (req,res) =>{
	console.log(req.query)
	const data = await getAccountData(req.params.accountNumber);
	if(req.query.startDate && req.query.endDate){
		const results = sortTransactions({startDate: req.query.startDate, endDate : req.query.endDate}, data);
		res.json(results)
	}
	console.log(data);
	res.json(data)
})


// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
	console.log("Server is running at port 3000");
});
