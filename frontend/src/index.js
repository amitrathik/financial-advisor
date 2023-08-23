import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

// Views
import { AccountsList } from "./views/Accounts/AccountsList";
import { AccountDetails } from "./views/Accounts/AccountDetails";

// Services
import { getAccounts } from "./lib/accountsService";
import { getTransactions } from './lib/transactionsService';
import { getCards } from "./lib/cardsService";

class App extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
			accounts: [],
			cards : [],
			selectedAccount:'',
			selectedYear:'',
			transactions : []
		};

	}

	
	componentDidMount(){
		Promise.all([getAccounts(), getCards()])
		 .then(([accounts, cards]) => {
		   this.setState({
				accounts : accounts, 
				cards : cards
			})
		 });
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
							cards={this.state.cards}
							resetAccountSelection={this.resetAccountSelection}
							handleYearSelection={this.handleYearSelection}
							selectedYear={this.state.selectedYear}
						/> : 
						<AccountsList 
							items={this.state.accounts}
							cards={this.state.cards}
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
