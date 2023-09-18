import React from "react"
const Account = (props) => {
  return (
    <li>
      <button 
        onClick={() => {props.handleAccountSelection(props.number)}} 
      >
        {`${props.type} - ${props.name} - ${props.number}` }
      </button>
    </li>
  )
}

export default Account;
