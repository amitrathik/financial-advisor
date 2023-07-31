import React from "react"
import { Account } from "../../components/account"
export const AccountsList = (props) => {
  return (
    <div className="AccountsList">
      <ul>
        {props.items.map((item,index) => <Account key={index} {...item}/>)}
      </ul>
    </div>
  )
}