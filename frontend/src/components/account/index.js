import React from "react"
export const Account = (props) => {
  const accountNumber = props.endingNumber ? props.endingNumber : props.number;
  return (
    <li>
      <button 
        onClick={() => {props.handleAccountSelection(accountNumber)}} 
      >
        {props.name ? props.name : `${props.bank} - ${props.type} - ${props.number}` }
      </button>
    </li>
  )
}
