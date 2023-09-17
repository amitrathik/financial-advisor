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
      console.log("loaded created accounts", account);
      // this.setState({
      //   accounts : accounts
      // })
    }

    render() {
        return (
            <div>
              Account Details
            </div>
        );
    }
}

export default AccountDetails;