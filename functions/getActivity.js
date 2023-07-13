const pathToActivities = './data/activities';
const fs = require('fs');
async function getActivity(cardNumber = '8717'){
	console.log(cardNumber);
	const activity = fs.promises.readdir(pathToActivities).then((files)=>{
		return files.find(file => file.includes(cardNumber));
	}).catch((error) =>{
		console.log(error);
	})
	return activity;
}

module.exports = getActivity;