import React from "react"
import {Transaction} from "../transaction";

const Transactions = (props) => {
    return (
        <div className="TransactionsList">
            <ul>
            {props.transactions.map((transaction,index) => <Transaction key={transaction.id} {...transaction} handleTransactionSelection={props.handleTransactionSelection} />)}
            </ul>
        </div>
    )
};

export default Transactions
