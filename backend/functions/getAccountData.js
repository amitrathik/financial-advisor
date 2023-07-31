const getActivity = require('./getActivity');
const getTransactions = require('./getTransactions');
const convertCSVToJSON = require('./convertCSVToJSON');

async function getAccountData (accountNumber = '8717'){ 
	return getActivity(accountNumber).then((fileName) => {
		return getTransactions(fileName);
	}).then((transactions) => {
		return convertCSVToJSON(transactions);
	})
}

module.exports = getAccountData;