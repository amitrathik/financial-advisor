import React from "react"
export const Card = (props) => {
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
