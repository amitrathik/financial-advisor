import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

// Services
import { getAccounts } from "./lib/accountsService";
import { getTransactions } from './lib/transactionsService';
import { getCards } from "./lib/cardsService";

// IndexDB 
const db = window.indexedDB.open("fa_db", 1);
// these two event handlers act on the IDBDatabase object,
// when the database is opened successfully, or not
db.onerror = (event) => {
	console.log("error loading db")
}

db.onsuccess = (event) => {
	console.log("db initialized")
}

db.onupgradeneeded =(event) => {
	const db = event.target.result;

	db.onerror = (event) => {
	  console.log("error loading db")
	};

	const objectStore = db.createObjectStore("accounts", {
		keyPath: "number",
	});
	objectStore.createIndex("type", "type", { unique: false });
	objectStore.createIndex("balance", "balance", { unique: false });
	objectStore.createIndex("created_at", "created_at", { unique: false });
	objectStore.createIndex("updated_at", "updated_at", { unique: false });
}

class App extends React.Component {
    constructor(props) {
		// lets get a DB setup in the browser for testing / local storage / demo prep
		super(props);
        this.state = {
			route : '',
			accounts: [],
			cards : [],
			selectedAccount:'',
			selectedYear:'',
			transactions : []
		};

	}

	
	componentDidMount(){
		// Promise.all([getAccounts(), getCards()])
		//  .then(([accounts, cards]) => {
		//    this.setState({
		// 		accounts : accounts, 
		// 		cards : cards
		// 	})
		//  });
	}


	handleAccountSelection = (selectedAccount) => {
		getTransactions(selectedAccount).then((transactions) => {
			this.setState({
				selectedAccount : selectedAccount,
				transactions : transactions
			})
		});
	}

	resetAccountSelection = () => {
		this.setState({
			selectedAccount : '',
			selectedMonth : '5',
			selectedYear : '2023'
		})
	}

	handleYearSelection = (evt) => {
		this.setState({
			selectedYear : evt.target.value
		})
	}

	handleMonthSelection = (evt) => {
		console.log(evt.target.value)
		this.setState({
			selectedMonth : evt.target.value
		})
	}

    render() {
		const view = '';
		const route = this.state.route;
		switch(route) {
			case 'accounts':
				view = this.state.selectedAccount ? 
					<AccountDetails 
						account={this.state.selectedAccount}
						transactions={this.state.transactions}
						cards={this.state.cards}
						resetAccountSelection={this.resetAccountSelection}
						handleYearSelection={this.handleYearSelection}
						handleMonthSelection={this.handleMonthSelection}
						selectedYear={this.state.selectedYear}
						selectedMonth={this.state.selectedMonth}
					/> : 
					<AccountsList 
						items={this.state.accounts}
						cards={this.state.cards}
						handleAccountSelection={this.handleAccountSelection}
					/> 
				break;
			default:

				break;
		}
        return (
            <div>
				<div className="App">
					<div className="Header">
						<h2>Financial Advisor</h2>
					</div>
					
					<div className="View">
						{view}
					</div>
				</div>
            </div>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
