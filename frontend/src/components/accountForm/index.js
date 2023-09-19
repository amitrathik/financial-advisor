import React from "react";

const AccountForm = (props) => {
	const type = props.account ? props.account.type : "";
	const name = props.account ? props.account.name : "";
	const number = props.account ? props.account.number : "";
	console.log("acct form",props.account)
	return (
		<div>
			<p>{props.account ? "Edit Account" : `Create New Account`}</p>
			<form onSubmit={props.handleAccountForm}>
				<div>
					<label>Name</label>
					<input type="text" name="name" defaultValue={name} onChange={props.handleInputChange}/>
				</div>
				<div>
					<label>Number</label>
					{props.account ? 
						<input type="text" name="number" value={number} readOnly={true} disabled={true}/>
						:
						<input type="text" name="number" defaultValue={number} onChange={props.handleInputChange}/>
					}
				</div>
				<div>
					<label>Type</label>
					<select name="type" defaultValue={type} onChange={props.handleInputChange}>
						<option value="">Type</option>
						<option value="bank">bank</option>
						<option value="card">card</option>
						<option value="cash">cash</option>
					</select>
				</div>
				
				<button type="submit">{props.account ? "Edit" : `Create`}</button>
			</form>
		</div>

	)

}

export default AccountForm;