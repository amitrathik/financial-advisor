function sortTransactions(year = '2023', transactions = []){
	// console.log(transactions[0]);
	const response = {
		results : [],
		startingBalance : 0,
		endingBalance:0
	};
	// SORT TRANSACTIONS BY YEAR
	for(let i = 0; i < transactions.length; i++){
		if ('PostingDate' in transactions[i] && new Date(transactions[i].PostingDate).getFullYear() == year){
			response.results.push(transactions[i])
		}else if('TransactionDate' in transactions[i] && new Date(transactions[i].TransactionDate).getFullYear() == year){
			response.results.push(transactions[i])
		}
	}
	// GROUP TRANSACTIONS INCOMING -> DETAILS = CREDIT
	// GROUP TRANSACTIONS OUTGOING -> DETAILS = DEBIT
		// GROUP TRANSACTIONS CC PAYMENT -> DESCRIPTION.includes('PAYMENT to Chase card')
		// GROUP CC PAYMENTS By CC # -> DESCRIPTION.includes('card ending in ####')
		

	// // sort in asc order
	// response.transactions.sort(function(a,b){
	// 	// Turn your strings into dates, and then subtract them
	// 	// to get a value that is either negative, positive, or zero.
	// 	return new Date(a.PostingDate) - new Date(b.PostingDate);
	// });
	// const numberOfTransactions = response.transactions.length;
	// response.startingBalance = response.transactions[0].Balance;
	// response.endingBalance = response.transactions[numberOfTransactions-1].Balance;

	return response
}

module.exports = sortTransactions;