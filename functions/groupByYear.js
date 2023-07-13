const groupByYear = (transactions) => {
	let transactionsByYears = {}
	for(let i = 0; i < transactions.length; i++){
		let yearOfTransaction = new Date(transactions[i].PostingDate).getFullYear();
		// console.log(yearOfTransaction,transactions[i]);
		if(!transactionsByYears[yearOfTransaction]){
			transactionsByYears[yearOfTransaction] = [];
		}
		transactionsByYears[yearOfTransaction].push(transactions[i])
	}
	return transactionsByYears;
}

function groupBy(transactions) {
	let grouped = {};
	for (let i=0; i<transactions.length; i++) {
	  let p = new Date(transactions[i].PostingDate).getFullYear();
	  if (!grouped[p]) { grouped[p] = []; }
	  grouped[p].push(transactions[i]);
	}
	return grouped;
}

module.exports = groupByYear;