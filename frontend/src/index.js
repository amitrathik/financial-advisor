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
		this.setState({
			selectedAccount : selectedAccount
		})
	}

	resetAccountSelection = () => {
		this.setState({
			selectedAccount : ''
		})
	}

    render() {
		const View = this.state.selectedAccount ? 
						<AccountDetails 
							account={this.state.selectedAccount}
							resetAccountSelection={this.resetAccountSelection}
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
