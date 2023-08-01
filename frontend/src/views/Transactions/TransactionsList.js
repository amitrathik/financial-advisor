import React from "react"
import { Transaction } from "../../components/transaction"
import { calculateBalance } from "../../lib/calculateBalance"
export const TransactionsList = (props) => {
  let filteredTransactions = props.transactions.filter((transactions) => {
    return transactions.PostingDate ? new Date(transactions.PostingDate).getFullYear() == props.selectedYear : new Date(transactions.TransactionDate).getFullYear() == props.selectedYear;
  })
  filteredTransactions = filteredTransactions.filter((transactions) => {
    return transactions.PostingDate ? new Date(transactions.PostingDate).getMonth() == props.selectedMonth : new Date(transactions.TransactionDate).getMonth().toString() == props.selectedMonth;
  })

  const incomingTransactions = filteredTransactions.filter((transactions) => {
    return transactions.Details ? (transactions.Details == "CREDIT" || transactions.Details == "DSLIP") : (parseFloat(transactions.Amount) > 0) 
  })
  
  const outgoingTransactions = filteredTransactions.filter((transactions) => {
    return transactions.Details ? transactions.Details == "DEBIT" : (parseFloat(transactions.Amount) < 0) 
  })
  const incomingTransactionsTotal = calculateBalance(incomingTransactions);
  const outgoingTransactionsTotal = calculateBalance(outgoingTransactions);
  console.log('incoming', incomingTransactionsTotal, 'outgoing', outgoingTransactionsTotal)
  // calculate total incoming / outgoing and difference based on the filtered transactions
  // const incomingTotal 
  return (
    <div className="TransactionsList">
      <form>
        <select defaultValue={props.selectedYear} onChange={(evt) => props.handleYearSelection(evt)}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        <select defaultValue={props.selectedMonth} onChange={(evt) => props.handleMonthSelection(evt)}>
          <option value="0">Jan</option>
          <option value="1">Feb</option>
          <option value="2">Mar</option>
          <option value="3">Apr</option>
          <option value="4">May</option>
          <option value="5">Jun</option>
          <option value="6">Jul</option>
          <option value="7">Aug</option>
          <option value="8">Sep</option>
          <option value="9">Oct</option>
          <option value="10">Nov</option>
          <option value="11">Dec</option>
        </select>
      </form>
      <p>Incoming : {incomingTransactionsTotal}</p>
      <p>Outgoing : {outgoingTransactionsTotal}</p>
      <ul>
        {filteredTransactions.map((item,index) => <Transaction key={index} {...item}/>)}
      </ul>
    </div>
  )
}