import React from "react"
import {TransactionsList} from "../Transactions/TransactionsList"
export const AccountDetails = (props) => {
  return (
    <div className="AccountDetails">
      <button onClick={() => props.resetAccountSelection()}>Back</button>
      <h2>{props.account} Details</h2>
      <h3>Transactions</h3>
      <TransactionsList 
          transactions = {props.transactions}
          handleYearSelection = {props.handleYearSelection}
          selectedYear = {props.selectedYear}
          handleMonthSelection = {props.handleMonthSelection}
          selectedMonth = {props.selectedMonth}
      ></TransactionsList>
    </div>
  )
}