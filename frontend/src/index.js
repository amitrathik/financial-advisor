import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

// import { ListView } from "./views/ListView";
import { AccountsList } from "./views/Accounts/AccountsList";
import { AccountDetails } from "./views/Accounts/AccountDetails";
import { getAccounts } from "./lib/accountsService";
import {getTransactions} from './lib/transactionsService'

class App extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
			accounts: [],
			selectedAccount:'',
			selectedYear:'2023',
			transactions : []
		};

	}

	
	componentDidMount(){
		getAccounts()
		.then(accounts => {
			this.setState({accounts})
		})
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
			selectedAccount : ''
		})
	}

	handleYearSelection = (evt) => {
		this.setState({
			selectedYear : evt.target.value
		})
	}

	handleMonthSelection = () => {

	}

    render() {
		const View = this.state.selectedAccount ? 
						<AccountDetails 
							account={this.state.selectedAccount}
							transactions={this.state.transactions}
							resetAccountSelection={this.resetAccountSelection}
							handleYearSelection={this.handleYearSelection}
							selectedYear={this.state.selectedYear}
						/> : 
						<AccountsList 
							items={this.state.accounts}
							handleAccountSelection={this.handleAccountSelection}
						/> 
        return (
            <div>
				<div className="App">
					<div className="Header">
						<h2>Financial Advisor</h2>
					</div>
					
					<div className="View">
						{View}
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
