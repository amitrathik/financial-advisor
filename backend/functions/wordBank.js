	// lets group the transactions by description
	// first we need a tag cloud or word bank
	const uniqueTransactionDescriptions = [];
	purchases.map((purchase, index) => {
		const purchaseObj = {};
		// first let's just try with indexOf
		if(uniqueTransactionDescriptions.indexOf(purchase.Description) == -1){
			purchaseObj = {
				name : purchase.Description,
			}
			uniqueTransactionDescriptions.push(purchase.Description);
		}
	})
	console.log(uniqueTransactionDescriptions);
	const wordBank = [];
	uniqueTransactionDescriptions.map((descriptions, index) => {
		// let's build a word / phrase cloud to catch things like
		// taco bell #### and Amazon.com*[code]
		const words = descriptions.split(' ');
		const descriptor = [];
		words.map((word) => {
			if(word != "" && wordBank.indexOf(word) == -1){
				wordBank.push(word)
			}
		})
	})
	// console.log(wordBank);