import React from "react"
import Account from '../Account';
class Accounts extends React.Component {
    constructor(props) {
		// lets get a DB setup in the browser for testing / local storage / demo prep
		super(props);
        this.state = {
            accounts : []
		};

	}
	
	componentDidMount(){
		// Promise.all([getAccounts(), getCards()])
		//  .then(([accounts, cards]) => {
		//    this.setState({
		// 		accounts : accounts, 
		// 		cards : cards
		// 	})
		//  });
	}

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.state.accounts.length > 1 ?  props.items.map((item,index) => <Account key={index} {...item} handleAccountSelection={props.handleAccountSelection} />) : 'No Accounts' }
                </ul>
                <a href={`/accounts/new`} className="btn btn-primary">Add an account</a>
            </div>
        );
    }
}

export default Accounts;