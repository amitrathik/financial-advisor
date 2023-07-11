/**
 *	Bank Account Object should be instantiated by an object or id, to get, create, update, delete
 *
 * */
// TODO : Refactor into a global list to be used throughout the app
const list_of_banks = [
	'CHASE', 'CAPITALONE' 
];

class Bank_Account{

	// TODO : refactor to accept object or id to find or create
	constructor(){}
	
	find() {}

	create(name, type) {
		this.name = name;
		this.type = type;
	}

	update(){}

	delete() {}

}
