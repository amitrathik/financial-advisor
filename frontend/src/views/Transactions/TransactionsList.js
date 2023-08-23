import React from "react"
import { Transaction } from "../../components/transaction";
import calculator from "../../lib/calculator";
import {getCreditCardPayments, getToChkAcctTransfers, getFromChkAcctTransfers, getToZellePayments, getFromZellePayments} from "../../lib/filters";

import CreditCardPayments  from "../CreditCardPayments";
import ToChkAcctTransfers from "../ToChkAcctTransfers";

// data TODO: replace with API calls
import { zelleAccounts, chkAccounts } from "../../../data/placeholder";

export const TransactionsList = (props) => {
  const filteredTransactions = props.transactions;
  // const filteredTransactions = props.transactions.filter((transactions) => {
  //   return transactions.PostingDate ? new Date(transactions.PostingDate).getFullYear() == props.selectedYear : new Date(transactions.TransactionDate).getFullYear() == props.selectedYear;
  // })
  const creditCardPayments = [];
  props.cards.map((card,index) => {
    console.log(card.currentEndingNumber);
    let results = getCreditCardPayments(card.currentEndingNumber, props.transactions);
    creditCardPayments.push(results);
    // check former numbers
    if(card.formerEndingNumbers && card.formerEndingNumbers.length > 0){
      card.formerEndingNumbers.map((olderNumber) => {
        console.log(olderNumber);
        creditCardPayments.push(getCreditCardPayments(olderNumber, props.transactions));
      })
    }
    
  });

  // CHK Acct Transfers
  const ToAccountTransfers = [];
  chkAccounts.map((account,index) => {
    let results = getToChkAcctTransfers(account.number, props.transactions);
    if(results.length > 0)
      ToAccountTransfers.push(results);
  });

  console.log(ToAccountTransfers)

  const FromAccountTransfers = [];
  chkAccounts.map((account,index) => {
    let results = getFromChkAcctTransfers(account.number, props.transactions);
    if(results.length > 0)
    FromAccountTransfers.push(results);
  });

  // Zelle 
  const FromZellePayments = [];
  zelleAccounts.map((account,index) => {
    let results = getFromZellePayments(account.name, props.transactions);
    if(results.length > 0)
    FromZellePayments.push(results);
  });

  const ToZellePayments = [];
  zelleAccounts.map((account,index) => {
    let results = getToZellePayments(account.name, props.transactions);
    if(results.length > 0)
    ToZellePayments.push(results);
  });

  

  return (
    <div className="TransactionsList">
      <form>
        <select onChange={(evt) => props.handleYearSelection(evt)}>
          <option value="">Year</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        <select>
          <option value="">Month</option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </form>
      <ul> 
        {filteredTransactions.map((item,index) => <Transaction key={index} {...item}/>)}
      </ul>
      {creditCardPayments.map((payments,index) => <CreditCardPayments key={index} payments={payments}  /> )}
         
      {ToAccountTransfers.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}

      {FromAccountTransfers.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}

      {FromZellePayments.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}
      
      {ToZellePayments.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}

    </div>
  )
}