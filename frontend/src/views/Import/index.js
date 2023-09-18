import React from "react";
// data
import { createItem, getItems } from "../../lib/db";
// helpers
import convertCSVToJSON from "../../lib/helpers/convertCSVToJSON";
// views
import { ImportForm } from "../../components/importForm";
import { Transaction } from "../../components/transaction";
import { AccountSelection } from "../../components/accountSelection";

class ImportView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file : null,
			transactions : [],
			accounts : [],
			page : 1,
			offset : 0,
			limit : 1,
			type : "",
			account : "",
			from : "",
			to : "",
			createNewAccount : false,
			newAcctName : "",
			newAcctNo : "",
			newAcctType : "",
        }
    }

    async componentDidMount(){
		const importedTransactions = await getItems('transactions');
		const createdAccounts = await getItems('accounts');
		console.log("loaded imported transactions", importedTransactions);
		console.log("loaded created accounts", createdAccounts);
		this.setState({
			// transactions : importedTransactions,
			accounts : createdAccounts
		})
	}

    handleFileUpload = (evt) => {
		const file = evt.target.files[0];
		const reader = new FileReader();

		reader.onload = (evt) => {
			const results = convertCSVToJSON(evt.target.result);
			this.setState({
				transactions : results,
				page : 1
			})
		}
		reader.readAsText(file);

	}

	handleAccountSelection = (evt) => {
		console.log(evt.target.name)
		this.setState({
			[evt.target.name] : evt.target.value,
			createNewAccount : evt.target.value == "new" 
		})
	}

	handleInputChange = (evt) => {
		this.setState({
			[evt.target.name] : evt.target.value,
		})
	}

	handleAccountCreation = (evt) => {
		evt.preventDefault();
		const {newAcctName,newAcctNo,newAcctType} = this.state
		// time to create acct, for now, I'll just push new object to accounts
		const accounts = this.state.accounts;
		// set up new acct obj
		const account = {
			name: newAcctName,
			number : newAcctNo,
			type : newAcctType
		}
		// create in db
		createItem("accounts", account);
		// push acct to array and update state to refresh fe
		accounts.push({
			name: newAcctName,
			number : newAcctNo,
			type : newAcctType
		})
		this.setState({
			accounts : accounts,
			createNewAccount : false
		})

	}

	handleTypeSelection = (evt) => {
		this.setState({
			type : evt.target.value,
		})
	}

	handleImport = (evt) => {
		evt.preventDefault();
		console.log("handle import", evt)
		let transaction = {}
		Object.entries(evt.target.elements).forEach(([name, input]) => {
			if(input.type != 'submit') {
				transaction[input.name] = input.value;
			}
		});
		// lets first see if we can find any transactions with the same description

		// create in db
		createItem("transactions", transaction);
		this.setState({
			page: this.state.page + 1
		})
	}

	paginate(){
		const transactions = this.state.transactions;
		const page = this.state.page;
		const limit = this.state.limit;
		const offset = this.state.offset;
		return transactions.slice((page - 1) * limit, page * limit);
	}

    render(){
		console.log(this.state.page)
		const size = this.state.transactions.length;
        const transactions = size > 0 && this.state.page <= size ? this.paginate() : [];
		console.log(transactions);
        return (
				size > 0 && this.state.page <= size ? 
				<div>
					<p>{this.state.page} of {this.state.transactions.length}</p>
					<p>Transactions</p>
					<Transaction key={transactions[0].id} date={transactions[0].PostingDate} amount={transactions[0].Amount} description={transactions[0].Description} type={transactions[0].Details}/>
					<ImportForm 
						transaction={transactions[0]}
						accounts={this.state.accounts}
						type={this.state.type}
						handleTypeSelection={this.handleTypeSelection}
						handleAccountSelection={this.handleAccountSelection}
						handleAccountCreation={this.handleAccountCreation}
						handleInputChange={this.handleInputChange}
						handleImport={this.handleImport}
						createNewAccount={this.state.createNewAccount}
					/>
				</div>
			: 
				<div>
					{this.state.page > size ? "Import Complete" : ""}
					<p>Import Transactions</p>
					<form>
						<input 
							type="file"
							onChange={this.handleFileUpload} 
						/>
						<button type="button">Upload</button>
					</form> 
				</div>
		)
    }
}

export default ImportView;