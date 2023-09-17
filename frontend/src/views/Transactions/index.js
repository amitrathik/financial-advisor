import React from "react"
import { getItems } from "../../lib/db";
import Transactions from "../../components/transactions";
import { NoTransaction } from "./NoTransaction";
import TransactionDetails from "./TransactionDetails";

class TransactionsView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          transactions : [],
          selectedTransaction : null
        };

	}
	
	async componentDidMount(){
		const transactions = await getItems('transactions');
		console.log("loaded imported transactions", transactions);
		this.setState({
			transactions : transactions
		})
	}

	handleTransactionSelection = (transactionId) => {
		console.log(transactionId)
		this.setState({
			selectedTransaction : transactionId
		})
	}

    render() {
        const transactions = this.state.transactions;
        const selectedTransaction = this.state.selectedTransaction;
        return (
            <div>
              {
                transactions.length > 0 && !this.state.selectedTransaction ? 
                  <Transactions 
                    transactions={transactions}
					handleTransactionSelection={this.handleTransactionSelection}
                  />
                  : 
				  	selectedTransaction ? 
					<TransactionDetails transaction={this.state.selectedTransaction}/> : 
					<NoTransaction />
              }
            </div>
        );
    }
}

export default TransactionsView;