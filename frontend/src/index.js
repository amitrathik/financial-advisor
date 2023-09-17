import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
// data
import { SetupDB } from "./lib/db";
// views
import Dashboard from "./views/Dashboard";
import AccountsView from "./views/Accounts";
import TransactionsView from "./views/Transactions";
import ImportView from "./views/Import";

SetupDB('fa_db', 1);

class App extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			view : ''
		}
	}

	handleClick = (evt) => {
		console.log(evt.target.name)
		this.setState({
			view : evt.target.name
		})
	}


    render() {
		const route = this.state.view;
		let view = "";
		switch(route){
			case "dashboard":
				view = <Dashboard />
				break;
			case "accounts":
				view = <AccountsView />
				break;
			case "transactions":
				view = <TransactionsView />
				break;
			case "import":
				view = <ImportView />
				break;
			default:
				view = <Dashboard />
				break;
		}
        return (

				<div>
					<nav>
						<ul>
							<li>
								<button type="button" name="dashboard" onClick={this.handleClick}>Dashboard</button>
							</li>
							<li>
								<button type="button" name="accounts" onClick={this.handleClick}>Accounts</button>
							</li>
							<li>
								<button type="button" name="transactions" onClick={this.handleClick}>Transactions</button>
							</li>
							<li>
								<button type="button" name="import" onClick={this.handleClick}>Import</button>
							</li>
						</ul>
					</nav>
					{view}	
				</div>
        );
    }
}
  
ReactDOM.render(
	<App />,
	document.getElementById("root")
);