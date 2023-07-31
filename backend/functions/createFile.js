fs.writeFile('./data/statements/Chase8717_Activity_20220401.json', JSON.stringify(data), err => {
	if(err) {
		console.log(err)
		return;
	}
	console.log("no errors, writing file now");
});