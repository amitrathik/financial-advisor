import React from "react"
import { getItems } from "../../lib/db";
import Transactions from "../../components/transactions";
class TransationsView extends React.Component {
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

    render() {
        const transactions = this.state.transactions;
        const selectedTransaction = this.state.selectedTransaction;
        return (
            <div>
              {
                transactions.length > 0 ? 
                  <Transactions 
                    transactions={transactions}
                  />
                  : selectedTransaction ? "Selected Transaction" : "No transactions" 
              }
            </div>
        );
    }
}

export default TransationsView;