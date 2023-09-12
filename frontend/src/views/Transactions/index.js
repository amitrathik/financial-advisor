import calculator from "../../lib/calculator";
import {getCreditCardPayments, getToChkAcctTransfers, getFromChkAcctTransfers, getToZellePayments, getFromZellePayments} from "../../lib/filters";

import CreditCardPayments  from "../CreditCardPayments";
import ToChkAcctTransfers from "../ToChkAcctTransfers";

// data TODO: replace with API calls
import { zelleAccounts, chkAccounts } from "../../../data/placeholder";
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

  {creditCardPayments.map((payments,index) => <CreditCardPayments key={index} payments={payments}  /> )}
         
  {ToAccountTransfers.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}

  {FromAccountTransfers.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}

  {FromZellePayments.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}
  
  {ToZellePayments.map((transfers,index) => <ToChkAcctTransfers key={index} transfers={transfers}  /> )}