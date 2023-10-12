import React from "react"
import Account from "../account";
import AccountForm from "../accountForm";

const Accounts = (props) => {
    return (
        <div className="AccountsList">
            <button type="button" onClick={props.toggleNewAccountForm}>Create a new account</button>
            <AccountForm 
                showForm={props.showNewAccountForm}
                toggleNewAccountForm={props.toggleNewAccountForm}
            /> 
            <ul>
                {props.accounts.map((account,index) => <Account key={index} {...account} handleAccountSelection={props.handleAccountSelection} />)}
            </ul>
        </div>
    )
};

export default Accounts
