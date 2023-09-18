import React from "react"

export const Transaction = (props) => {
  return (
    <li>
      {props.type} | {props.date} | {props.amount} | {props.description}
      <button type="button" onClick={() => props.handleTransactionSelection(props.id)}>View</button>
    </li>
  )
}
