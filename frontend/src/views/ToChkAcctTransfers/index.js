import React from "react"
import { Transaction } from "../../components/transaction";
import calculator from "../../lib/calculator";
export const ToChkAcctTransfers = (props) => {
  // console.log(props)
  return (
    <div className="ToChkAcctTransfers">
      <ul>
        {props.transfers.map((item,index) => <Transaction key={index} {...item}/> )}
        {props.transfers.length > 0 ? calculator(props.transfers) : 'N/A'}
      </ul>
    </div>
  )
}

export default ToChkAcctTransfers