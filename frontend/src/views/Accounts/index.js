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
          newAcctName : "",
          newAcctNo : "",
          newAcctType : "",
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
      this.setState({
        showNewAccountForm : true
      })
    }

    handleInputChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value,
      })
    }
  
    handleAccountCreation = (evt) => {
      evt.preventDefault();
      const {newAcctName,newAcctNo,newAcctType} = this.state
      // time to create acct, for now, I'll just push new object to accounts
      const accounts = this.state.accounts;
      // set up new acct obj
      const account = {
        name: newAcctName,
        number : newAcctNo,
        type : newAcctType
      }
      // create in db
      createItem("accounts", account);

      this.setState({
        showNewAccountForm : false
      })
  
    }


    render() {
        const accounts = this.state.accounts;
        const selectedAccount = this.state.selectedAccount;
        console.log(accounts.length > 0 && !this.state.selectedAccount)
        return (
            <div>
              {
                accounts.length > 0 && !this.state.selectedAccount? 
                  <Accounts 
                    accounts={accounts}
                    handleAccountSelection={this.handleAccountSelection}
                  />
                  : selectedAccount ? 
                    <AccountDetails account={this.state.selectedAccount}/> : 
                    <NoAccounts 
                      toggleNewAccountForm={this.toggleNewAccountForm}
                      showNewAccountForm={this.state.showNewAccountForm}
                      handleAccountCreation={this.handleAccountCreation}
                      handleInputChange={this.handleInputChange}
                    />
              }
            </div>
        );
    }
}

export default AccountsView;