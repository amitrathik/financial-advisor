import React from "react"
import { Transaction } from "../../components/transaction";
import calculator from "../../lib/calculator";
export const CreditCardPayments = (props) => {
  return (
    <div className="CreditCardPayments">
      <ul>
        {props.payments.map((item,index) => <Transaction key={index} {...item}/> )}
        {props.payments.length > 0 ? calculator(props.payments) : 'N/A'}
      </ul>
    </div>
  )
}