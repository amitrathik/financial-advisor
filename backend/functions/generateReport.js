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