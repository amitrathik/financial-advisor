import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

import { ListView } from "./views/ListView";
import {getTransactions} from './lib/transactionsService'

class App extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
			transactions : []
		};
	}

	
	componentDidMount(){
		getTransactions()
		.then(transactions => {
			this.setState({transactions})
		})
	}

    render() {

        return (
            <div>
				<div className="App">
					<div className="Header">
						<h2>Financial Advisor</h2>
					</div>
					<div className="Transactions">
						<ListView 
							items={this.state.transactions}
						/>
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
