import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
// data
import { accounts as ListOfAccounts} from "../data/accounts";
// helpers
import { generateId } from "./lib/helpers";
import convertCSVToJSON from "./lib/helpers/convertCSVToJSON";
// views
import TransactionsList  from "./views/Transactions/TransactionsList";
import { ImportForm } from "./components/importForm";

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
		accounts.push({
			id : generateId(),
			name: newAcctName,
			number : newAcctNo,
			type : newAcctType
		})

		this.setState({
			accounts : accounts,
			createNewAccount : false
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
        return (
				this.state.transactions.length > 0 ? 
					<div>
						<p>Transactions</p>
						<TransactionsList 
							transactions={transactions}
						/>
						<ImportForm 
							transaction={transactions[0]}
							accounts={this.state.accounts}
							handleAccountSelection={this.handleAccountSelection}
							handleAccountCreation={this.handleAccountCreation}
							handleInputChange={this.handleInputChange}
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