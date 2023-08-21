const path = require("path");
const fs = require('fs');
const pathToActivities = './data/activities';
async function getTransactions(fileName){
	const transactions = await fs.promises.readFile(path.join(pathToActivities,fileName),'utf-8').catch((error) => {
		console.log(error);
	});
	return transactions;
}

module.exports = getTransactions;