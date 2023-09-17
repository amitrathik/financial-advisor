import React from "react"
import { getItem } from "../../lib/db";

class TransactionDetails extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            transaction : null,
        };
	  }
	
    async componentDidMount(){
      console.log(this.props.transaction)
      const transaction = await getItem('transactions',this.props.transaction );
      console.log("loaded transaction", transaction);
      this.setState({
        transaction : transaction
      })
    }

    render() {
        const transaction = this.state.transaction;
        return (
            <div>
              {transaction ? 
                <div>
                  <h2>Transaction Details</h2>
                </div>
              : "Transaction not found"}
            </div>
        );
    }
}

export default TransactionDetails;