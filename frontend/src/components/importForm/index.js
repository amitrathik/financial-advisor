import React from "react";
import { AccountForm } from "../accountForm";

export const ImportForm = (props) => {
	const transaction = props.transaction;
	const type = transaction.Details == "CREDIT" ? "income" : "expense";
	const AccountSelection = props.accounts.map((account, key) => {
		return <option key={key} value={account.id}>{account.type} - {account.name} | {account.number}</option>
	})
	return (
		<div>
			<form>
				<div>
					<label>Amount</label>
					<input type="text" value={transaction.Amount}/>
				</div>
				<div>
					<label>Type</label>
					<select defaultValue={type}>
						<option value="">Type</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
				</div>
				<div>
					<label>From</label>
					<select name="from" defaultValue={props.from} onChange={(evt) => props.handleAccountSelection(evt)}>
						<option value="">From</option>
						{AccountSelection}
						<option value="new">+ Create A New Account</option>
					</select>
				</div>
				<div>
					<label>To</label>
					<select name="to" defaultValue={props.from} onChange={(evt) => props.handleAccountSelection(evt)}>
						<option value="">To</option>
						{AccountSelection}
						<option value="new">+ Create A New Account</option>
					</select>
				</div>
			</form>
			{
				props.createNewAccount 
				? 
					<AccountForm 
						handleAccountCreation={props.handleAccountCreation}
						handleInputChange={props.handleInputChange}
					/> 
				: 
					""
			}
		</div>

	)

}