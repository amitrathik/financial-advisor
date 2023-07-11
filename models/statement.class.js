/**
 * A Statement is a collection of Transactions
 * Statement Model should represent either Credit Card or Bank Account
 * 
 * Data can be either JSON or CSV
 * 
 * File Name : [Bank][Card Number]_Statement_[Year][Day][Month].[File Extension]
 * 
 * CSV Data
 * 	first row is Keys
 * 	each row after is a Transaction with values mapped to keys
 * 	
 * 	line 1 : details, posting date, etc
 *  line 2 : credit, 01/04/2021, ..
 * 
 * 	transaction #1 : 
 * 		details : credit
 * 		posting date : 01/04/2021
 * 		..
 * 
 * 	transaction #2
 * 
 * */

class Statement {
	constructor(filename){
		// read file name, split the string by _ then analyze each part
		const statementInfo = filename.split('_');
		// we should have an array, let's loop through
		for(let i = 0; i < statementInfo.length; i++){
			const part = statementInfo[i];
			// ignore the word 'statement'
			if(part != 'Statement'){
				// if part includes 'Chase' 
				if(part.toLowerCase().includes('chase')){
					const bankName = part.slice(0,5);
					const bankAccountNumber = part.slice(5,9);
					console.log('bank name', bankName);
					console.log('bank account number', bankAccountNumber) 
				}
			}
			// check if string matches known banks [Chase, Capital One]
		}

		// get file extension, is it a CSV or is it JSON?
		//console.log(statementInfo);

		// based on the keys, is it a bank account statement or credit card statement?
	}


}


const statement = new Statement('Chase9687_Statement_20201222_20210125.CSV');
