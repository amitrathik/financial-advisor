import React from "react"
import { getItem, getItems, editItem, createItem } from "../../lib/db";
import { filterTransactions } from "../../lib/filters";
import AccountForm from "../../components/accountForm";
import Transactions from "../../components/transactions";

class AccountDetails extends React.Component {
    constructor(props) {
		    super(props);
        this.state = {
          account : null,
          name : "",
          number : "",
          type : "",
          transactions : []
        };
	  }
	
    async componentDidMount(){
      console.log(this.props.account)
      const account = await getItem('accounts',this.props.account );
      const transactions = await getItems('transactions'); 
      console.log("transactions for acct", transactions)   
      console.log("loaded account", account);
      this.setState({
        account : account,
      })
    }

    render() {
        const account = this.state.account;
        return (
            <div>
              {account ? 
                <div>
                  <h2>Account Details</h2>
                  <AccountForm  
                      account={account}
                      showForm={true}
                      toggleNewAccountForm={props.toggleNewAccountForm}
                  />
                  <Transactions 
                    transactions={this.state.transactions}
                  />
                </div>
              : "Account not found"}
            </div>
        );
    }
}

export default AccountDetails;