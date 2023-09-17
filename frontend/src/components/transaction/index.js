import React from "react"

export const Transaction = (props) => {
  return (
    <li>
      {props.date} - {props.amount} 
      <button type="button" onClick={() => props.handleTransactionSelection(props.id)}>View</button>
    </li>
  )
}
