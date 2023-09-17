import React from "react"
import { getItem } from "../../lib/db";

class AccountDetails extends React.Component {
    constructor(props) {
		    super(props);
        this.state = {
          account : null,
        };
	  }
	
    async componentDidMount(){
      console.log(this.props.account)
      const account = await getItem('accounts',this.props.account );
      console.log("loaded account", account);
      this.setState({
        account : account
      })
    }

    render() {
        const account = this.state.account;
        return (
            <div>
              {account ? 
                <div>
                  <h2>Account Details</h2>
                  <p>{account.name} - {account.number} - {account.type}</p>
                </div>
              : "Account not found"}
            </div>
        );
    }
}

export default AccountDetails;