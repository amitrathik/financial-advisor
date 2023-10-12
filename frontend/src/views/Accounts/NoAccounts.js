import React from "react"
import AccountForm from "../../components/accountForm";
export const NoAccounts = (props) => {
  return (
    <div className="NoAccounts">
        <AccountForm 
          showForm={props.showNewAccountForm}
          toggleNewAccountForm={props.toggleNewAccountForm}
        /> 
        <p> No accounts found. <button type="button" onClick={props.toggleNewAccountForm}>Create a new account</button></p>        
    </div>
  )
}