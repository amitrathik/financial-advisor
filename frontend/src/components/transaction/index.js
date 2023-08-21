import React from "react"

const chkModel = {
  Details : '',
  PostingDate : '',
  Description : '',
  Amount : '',
  Type : '',
  CheckorSlip : ''
}

const cardModel = {
  TransactionDate : '',
  PostDate : '',
  Description : '',
  Category : '',
  Type : '',
  Amount : '',
  Memo : ''
}

export const Transaction = (props) => {
  const TransactionType = props.Details ? 'CHK' : 'CARD';
  const data = TransactionType == 'CHK' ? Object.assign(chkModel, props) : Object.assign(cardModel, props)
  let html = '';
  for (const key in data) {
    html += `${data[key]} `;
  }
  return (
    <li>
      {html}
    </li>
  )
}
