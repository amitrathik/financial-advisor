function getCreditCardPayments(accountNumber = '',transactions){
	const payments = transactions.map((transaction) => {
		if(transaction.Description && transaction.Description.includes(accountNumber)){
			return transaction;
		}
	})
	return payments
}

module.exports = getCreditCardPayments;