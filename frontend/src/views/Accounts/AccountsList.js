import React from "react"
import { Account } from "../../components/account"
export const AccountsList = (props) => {
  console.log(props)
  return (
    <div className="AccountsList">
      <ul>
        {props.items.map((item,index) => <Account key={index} {...item} handleAccountSelection={props.handleAccountSelection} />)}
      </ul>
    </div>
  )
}