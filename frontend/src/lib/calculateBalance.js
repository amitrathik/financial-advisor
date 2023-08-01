export const calculateBalance = (transactions) => {
	let balance = 0;
	for(let i = 0; i < transactions.length; i++){
		balance += parseFloat(transactions[i].Amount);
	}
	return balance;
}