import React from "react"
import { Transaction } from "../components/transaction"
export const ListView = (props) => {
  return (
    <div className="ListView">
      <ul>
        {props.items.map((item,index) => <Transaction key={index} {...item}/>)}
      </ul>
    </div>
  )
}