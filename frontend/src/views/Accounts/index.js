import React from "react"
import { getItems } from "../../lib/db";
import Accounts from "../../components/accounts";
class AccountsView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          accounts : [],
          selectedAccount : null
        };

	}
	
	async componentDidMount(){
		const accounts = await getItems('accounts');
		console.log("loaded created accounts", accounts);
		this.setState({
			accounts : accounts
		})
	}

    handleAccountSelection = (evt) => {
		console.log(evt.target.name)
		this.setState({
			[evt.target.name] : evt.target.value,
			createNewAccount : evt.target.value == "new" 
		})
	}


    render() {
        const accounts = this.state.accounts;
        const selectedAccount = this.state.selectedAccount;
        return (
            <div>
              {
                accounts.length > 0 ? 
                  <Accounts 
                    accounts={accounts}
                    handleAccountSelection={this.handleAccountSelection}
                  />
                  : selectedAccount ? "Selected Account" : "No accounts" 
              }
            </div>
        );
    }
}

export default AccountsView;