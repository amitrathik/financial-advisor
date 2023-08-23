import React from "react"
import { Account } from "../../components/account"
// import { Card } from "../../components/card";
export const AccountsList = (props) => {
  return (
    <div className="AccountsList">
      <ul>
        {props.items.map((item,index) => <Account key={index} {...item} handleAccountSelection={props.handleAccountSelection} />)}
      </ul>
      {/* <ul>
        {props.cards.map((card,index) => <Card key={index} {...card} />)}
      </ul> */}
    </div>
  )
}