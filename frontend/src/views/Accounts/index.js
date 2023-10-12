import React from "react"
import { getItems, createItem } from "../../lib/db";
import Accounts from "../../components/accounts";
import { NoAccounts } from "./NoAccounts";
import  AccountDetails  from "./AccountDetails";
class AccountsView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          accounts : [],
          selectedAccount : null,
          showNewAccountForm : false,
        };
	  }
	
    async componentDidMount(){
      const accounts = await getItems('accounts');
      console.log("loaded created accounts", accounts);
      this.setState({
        accounts : accounts
      })
    }

    handleAccountSelection = (accountNumber) => {
      this.setState({
        selectedAccount : accountNumber
      })
    }

    toggleNewAccountForm = () => {
      console.log("toggle form")
      this.setState({
        showNewAccountForm : !this.state.showNewAccountForm
      })
    }


    render() {
        const accounts = this.state.accounts;
        const selectedAccount = this.state.selectedAccount;
        console.log(accounts.length > 0 && !this.state.selectedAccount)
        return (
            <div>
              {
                accounts.length > 0 && !this.state.selectedAccount ? 
                  <Accounts 
                    accounts={accounts}
                    handleAccountSelection={this.handleAccountSelection}
                    toggleNewAccountForm={this.toggleNewAccountForm}
                    showNewAccountForm={this.state.showNewAccountForm}
                  />
                  : selectedAccount ? 
                    <AccountDetails 
                      account={this.state.selectedAccount}
                      showNewAccountForm={this.state.showNewAccountForm}
                      toggleNewAccountForm={this.toggleNewAccountForm}
                    /> 
                    : 
                    <NoAccounts 
                      toggleNewAccountForm={this.toggleNewAccountForm}
                      showNewAccountForm={this.state.showNewAccountForm}
                    />
              }
            </div>
        );
    }
}

export default AccountsView;