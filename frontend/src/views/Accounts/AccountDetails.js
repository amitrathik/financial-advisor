import React from "react"
export const AccountDetails = (props) => {
  return (
    <div className="AccountDetails">
      <button onClick={() => props.resetAccountSelection()}>Back</button>
      {props.account} Details
    </div>
  )
}