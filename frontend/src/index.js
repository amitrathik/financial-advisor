import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

// import { ListView } from "./views/ListView";
import { AccountsList } from "./views/Accounts/AccountsList";
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

    render() {

        return (
            <div>
				<div className="App">
					<div className="Header">
						<h2>Financial Advisor</h2>
					</div>
					<div className="Accounts">
						<AccountsList 
							items={this.state.accounts}
						/>
					</div>
					{/* <div className="Transactions">
						<ListView 
							items={this.state.transactions}
						/>
					</div> */}
				</div>
            </div>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
