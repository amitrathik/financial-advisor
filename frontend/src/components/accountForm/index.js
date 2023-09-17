import React from "react";

const AccountForm = (props) => {
	const type = ""
	return (
		<div>
			<p>Create New Account</p>
			<form onSubmit={props.handleAccountCreation}>
				<div>
					<label>Name</label>
					<input type="text" name="newAcctName" onChange={props.handleInputChange}/>
				</div>
				<div>
					<label>Number</label>
					<input type="text" name="newAcctNo" onChange={props.handleInputChange}/>
				</div>
				<div>
					<label>Type</label>
					<select name="newAcctType" defaultValue={type} onChange={props.handleInputChange}>
						<option value="">Type</option>
						<option value="bank">bank</option>
						<option value="card">card</option>
						<option value="cash">cash</option>
					</select>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>

	)

}

export default AccountForm;