import React from "react"
import Account from "../account";

const Accounts = (props) => {
    return (
        <div className="AccountsList">
            <ul>
            {props.accounts.map((account,index) => <Account key={index} {...account} handleAccountSelection={props.handleAccountSelection} />)}
            </ul>
        </div>
    )
};

export default Accounts
