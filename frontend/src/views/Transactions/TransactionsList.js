import React from "react"
import { Transaction } from "../../components/transaction";
class TransactionsList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      transactions : props.transactions
    }
  }

  render(){
    const transactions = this.state.transactions
    return (
      <div className="TransactionsList">
        <ul> 
          {transactions.map((item,index) => <Transaction key={index} {...item}/>)}
        </ul>
      </div>
    )
  }
}

export default TransactionsList;
