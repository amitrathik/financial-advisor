// IndexDB 
export const SetupDB = (db) => {
	// these two event handlers act on the IDBDatabase object,
	// when the database is opened successfully, or not
	db.onerror = (event) => {
		console.log("error loading db")
	}

	db.onsuccess = (event) => {
		console.log("db initialized")
	}

	db.onupgradeneeded =(event) => {
		const db = event.target.result;

		db.onerror = (event) => {
		console.log("error loading db")
		};

		// Create Account Object Store
		const accountObjectStore = db.createObjectStore("accounts", {
			keyPath : "number"
		});
		accountObjectStore.createIndex("name", "name", { unique: false });
		accountObjectStore.createIndex("number", "number", { unique: true });
		accountObjectStore.createIndex("type", "type", { unique: false });

		// Create Transaction Object Store
		const transactionObjectStore = db.createObjectStore("transactions", {
			autoIncrement : true
		});
		transactionObjectStore.createIndex("amount", "amount", { unique: false });
		transactionObjectStore.createIndex("date", "date", { unique: false });
		transactionObjectStore.createIndex("type", "type", { unique: false });
		transactionObjectStore.createIndex("account", "account", { unique: false });
		transactionObjectStore.createIndex("to", "to", { unique: false });
		transactionObjectStore.createIndex("from", "from", { unique: false });
	}
}

export const createItem = (object, item) => {		
	// initialize web db
	const db = window.indexedDB.open("fa_db", 1);
	db.onsuccess = (event) => {
		console.log("db initialized")
		console.log(event.target.result)
		const db = event.target.result;		
		const transaction = db.transaction([object], "readwrite")
		const objectStore = transaction.objectStore(object);
		const request = objectStore.add(item);
		request.onsuccess = (event) => {
			console.log("object created", event.target.result)
		};
		request.onerror = (event) => {
			console.log("error", event)
		}
	}

}

export const getItem = (object, item) => {		
	// initialize web db
	const db = window.indexedDB.open("fa_db", 1);
	db.onsuccess = (event) => {
		console.log("db initialized")
		console.log(event.target.result)
		const db = event.target.result;		
		const transaction = db.transaction([object], "readwrite")
		const objectStore = transaction.objectStore(object);
		const request = objectStore.get(item);
		request.onsuccess = (event) => {
			console.log("retrieved",event.target.result);		
		};
		request.onerror = (event) => {
			console.log("error", event)
		}
	}

}