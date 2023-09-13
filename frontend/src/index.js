import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
// data
import { accounts as ListOfAccounts} from "../data/accounts";
import { SetupDB, createItem, getItem } from "./lib/db";
// helpers
import { generateId } from "./lib/helpers";
import convertCSVToJSON from "./lib/helpers/convertCSVToJSON";
// views
import TransactionsList  from "./views/Transactions/TransactionsList";
import { ImportForm } from "./components/importForm";
import { Transaction } from "./components/transaction";

// initialize web db
const db = window.indexedDB.open("fa_db", 1);
SetupDB(db);

class App extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			file : null,
			transactions : [],
			accounts : ListOfAccounts,
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
			newAcctType : ""
		}

	}

	handleFileUpload = (evt) => {
		const file = evt.target.files[0];
		const reader = new FileReader();

		reader.onload = (evt) => {
			const results = convertCSVToJSON(evt.target.result);
			this.setState({
				transactions : results
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
		const formData = new FormData(evt.target);
		let transaction = {}
		const transactions = this.state.transactions
		Object.entries(evt.target.elements).forEach(([name, input]) => {
			if(input.type != 'submit') {
				transaction[input.name] = input.value;
			}
		});
		transactions.push(transaction);
		this.setState({
			transactions:transactions,
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

    render() {
		const transactions = this.paginate();
		const transaction = transactions[0];
		console.log(transaction)
        return (
				this.state.transactions.length > 0 ? 
					<div>
						<p>Transactions</p>
						<Transaction key={transaction.id} {...transaction}/>
						<ImportForm 
							transaction={transaction}
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
						<p>Import Transactions</p>
						<form>
							<input 
								type="file"
								onChange={this.handleFileUpload} 
							/>
							<button type="button">Upload</button>
						</form> 
					</div>
        );
    }
}
  
ReactDOM.render(
	<App />,
	document.getElementById("root")
);