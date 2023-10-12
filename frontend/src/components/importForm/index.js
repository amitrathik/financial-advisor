import React from "react";
import AccountForm  from "../accountForm";
import { AccountSelection } from "../accountSelection";

export const ImportForm = (props) => {
	const transaction = props.transaction;
	const date = new Date(transaction.PostingDate ? transaction.PostingDate : transaction.date);
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDay();
	const formattedDate= date.toISOString(Date.UTC(year,month,day)).split('T')[0];
	console.log(year,month,day, date.toISOString(Date.UTC(year,month,day)).split('T')[0])
	// const type = transaction.Details == "CREDIT" ? "income" : "expense";
	return (
		<div>
			<form onSubmit={props.handleImport}>
				<div>
					<label>Amount</label>
					<input type="text" name="amount" value={transaction.Amount}/>
				</div>
				<div>
					<label>Date</label>
					<input type="date" name="date" value={formattedDate}/>
				</div>
				<div>
					<label>Type</label>
					<select name="type" value={props.type} onChange={props.handleTypeSelection}>
						<option value="">Type</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
						<option value="transfer">Transfer</option>
					</select>
				</div>
				<div>
					<label>Description</label>
					<input type="text" name="description" value={transaction.Description}/>
				</div>
				{
					props.type == "transfer" 
					? 
						<>
							<AccountSelection
								title="From"
								name="from"
								handleAccountSelection={props.handleAccountSelection} 
								accounts={props.accounts}
							/>
							<AccountSelection
								title="To"
								name="to"
								handleAccountSelection={props.handleAccountSelection} 
								accounts={props.accounts}
							/>
						</> 
					: 
						<AccountSelection
							title="Account"
							name="account"
							handleAccountSelection={props.handleAccountSelection} 
							accounts={props.accounts}
							value={props.account}
						/>
				}

				<button type="submit">Import</button>
			</form>
			<AccountForm 
				showForm={props.showAcctForm}
				toggleNewAccountForm={props.toggleNewAccountForm}
			/> 
		</div>

	)

}