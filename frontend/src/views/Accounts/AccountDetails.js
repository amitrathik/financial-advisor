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

    handleInputChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value,
      })
    }
  
    handleAccountForm = (evt) => {
      evt.preventDefault();
      const account = {
        name : this.state.name !== "" ? this.state.name : this.state.account.name,
        number : this.state.number !== "" ? this.state.number : this.state.account.number,
        type : this.state.type !== "" ? this.state.type : this.state.account.type,
      }
      console.log(account)
      // create in db
      const dbRequest = this.state.account ? editItem("accounts", account) : createItem("accounts", account);
      dbRequest.then((result) => {
        console.log(result);
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
                      handleAccountForm={this.handleAccountForm}
                      handleInputChange={this.handleInputChange}
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