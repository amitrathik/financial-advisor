import React from "react"

const Account = (props) => {
  return (
    <div className="Account">
        {props.accounts ? 'No results' : ''}
    </div>
  )
}

export default Account;