import React from "react"
import { Transaction } from "../../components/transaction";
import calculator from "../../lib/calculator";
import getCreditCardPayments from "../../lib/getCreditCardPayments";

import { CreditCardPayments } from "../CreditCardPayments";

export const TransactionsList = (props) => {
  const filteredTransactions = props.transactions;
  // const filteredTransactions = props.transactions.filter((transactions) => {
  //   return transactions.PostingDate ? new Date(transactions.PostingDate).getFullYear() == props.selectedYear : new Date(transactions.TransactionDate).getFullYear() == props.selectedYear;
  // })
  const creditCardPayments = [];
  props.cards.map((card,index) => {
    let results = getCreditCardPayments(card.currentEndingNumber, props.transactions);
    creditCardPayments.push(results);
    // check former numbers
    card.formerEndingNumbers.map((olderNumber) => {
      creditCardPayments.push(getCreditCardPayments(olderNumber, props.transactions));
    })
    
  });
  // console.log(creditCardPayments)

  // const creditCardTotal = calculator(creditCardPayments['5550'])

  // all transfers TO Business Chk Acct
  // const transferToBusinessChkAcct = props.transactions.filter((transactions) => {
  //   const AccountNumber = '5962';
  //   return transactions.Description.includes(`Online Transfer To Chk …${AccountNumber}`)
  // })
  // const transferTotals = calculator(transferToBusinessChkAcct)
  

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
     {/*     
      <ul>
        {transferToBusinessChkAcct.map((item,index) => <Transaction key={index} {...item}/>)}
        {transferTotals}
      </ul> */}
    </div>
  )
}