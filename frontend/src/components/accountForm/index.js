import React from "react";
import { getItem, getItems, editItem, createItem } from "../../lib/db";
class AccountForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			account : this.props.account ? this.props.account : null,
			showForm : this.props.showForm 
		}
	}  

	handleSubmit = async (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const accountData = {};
        for (let [key, value] of formData.entries()) {
            accountData[key] = value;
        }
		// create in db
		const dbRequest = this.state.account ? editItem("accounts", accountData) : createItem("accounts", accountData);
		dbRequest.then((result) => {
			console.log(result);
		})
		this.props.toggleNewAccountForm();

    }

    handleInputChange = (evt) => {
		this.setState({
			[evt.target.name] : evt.target.value,
		})
    }

	render(){
		const {name, number, type} = this.props.account ? this.props.account : {};
		console.log()
		return (
			this.props.showForm ? 
			<div>
				<p>{this.state.account ? "Edit Account" : `Create New Account`}</p>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name</label>
						<input type="text" name="name" defaultValue={name} onChange={this.handleInputChange}/>
					</div>
					<div>
						<label>Number</label>
						<input type="text" name="number" defaultValue={number} onChange={this.handleInputChange}/>
					</div>
					<div>
						<label>Type</label>
						<select name="type" defaultValue={type} onChange={this.handleInputChange}>
							<option value="">Type</option>
							<option value="bank">bank</option>
							<option value="card">card</option>
							<option value="cash">cash</option>
						</select>
					</div>
					
					<button type="submit">{this.state.account ? "Edit" : `Create`}</button>
				</form>
			</div>
			:
			""
		)
	}
}


export default AccountForm;