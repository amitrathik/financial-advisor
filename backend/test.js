const startingBalance = 3521.78
const accountSummaries = [{
	paymentsOrCredits : 3521.78,
	purchases: 1450.96,
	fees: 28.00,
},{
	paymentsOrCredits : 3290.87,
	purchases: 2255.61,
},{
	paymentsOrCredits : 1880.88,
	purchases : 3219.08
},{
	paymentsOrCredits : 1781.90,
	purchases : 4549.46
},{
	paymentsOrCredits : 6480.08,
	purchases : 3831.07,
	fees : 0.95
},{
	paymentsOrCredits : 3881.33,
	purchases : 3679.47,
	fees : 0.99,
},{
	paymentsOrCredits : 4198.66,
	purchases : 4421.48,
	fees : 0.99
},{
	paymentsOrCredits : 1924.34,
	purchases : 3539.70
},{
	paymentsOrCredits : 3539.70,
	purchases: 3451.06
},{
	paymentsOrCredits : 40.00,
	purchases : 4157.88,
	interestCharged : 67.97
}]
const results = {
	paymentsOrCredits : 0,
	purchases : 0,
	fees : 0,
	interestCharged : 0,
	balance : startingBalance
}
// should be account summaries from 01/04/2021 up to 10/04/2021
for(let i = 0; i< accountSummaries.length; i++){
	results.paymentsOrCredits += accountSummaries[i].paymentsOrCredits;
	results.purchases += accountSummaries[i].purchases;
	results.fees += accountSummaries[i].fees ? accountSummaries[i].fees : 0;
	results.interestCharged += accountSummaries[i].interestCharged ? accountSummaries[i].interestCharged : 0;
	results.balance -= accountSummaries[i].paymentsOrCredits - (accountSummaries[i].purchases + (accountSummaries[i].fees ? accountSummaries[i].fees : 0) + (accountSummaries[i].interestCharged ? accountSummaries[i].interestCharged : 0));

}

console.log(results)