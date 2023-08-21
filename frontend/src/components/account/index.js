import React from "react"
export const Account = (props) => {
  return (
    <li>
      <button 
        onClick={() => {props.handleAccountSelection(props.endingNumber)}} 
      >
        {props.name}
      </button>
    </li>
  )
}
