import React from "react";

export const AccountSelection = (props) => {
	const AccountSelection = props.accounts.map((account, key) => {
		return <option key={key} value={account.number}>{account.type} - {account.name} | {account.number}</option>
	})
    return (
		<div>			
            <label>{props.title}</label>
            <select name={props.name}  onChange={(evt) => props.handleAccountSelection(evt)}>
                <option value="">{props.title}</option>
                {AccountSelection}
                <option value="new">+ Create A New Account</option>
            </select>
		</div>

	)

}