let request = null;
let db = null;
let version = 1;
// IndexDB 
export const SetupDB = (dbName, version) => {
	return new Promise((resolve) => {
		// open the connection
		const request = indexedDB.open(dbName, version);
	
		request.onupgradeneeded = () => {
		  	const db = request.result;
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
		};
	
		request.onsuccess = () => {
		  db = request.result;
		  version = db.version;
		  console.log('request.onsuccess - initDB', version);
		  resolve(true);
		};
	
		request.onerror = () => {
		  resolve(false);
		};
	  });

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
	const results = [];
	db.onsuccess = (event) => {
		console.log("db initialized")
		console.log(event.target.result)
		const db = event.target.result;		
		const transaction = db.transaction([object], "readwrite")
		const objectStore = transaction.objectStore(object);
		const request = objectStore.get(item);
		request.onsuccess = (event) => {
			console.log("retrieved",event.target.result)
			results = event.target.result;	
			return results;	
		};
		request.onerror = (event) => {
			console.log("error", event)
		}
	}

}

export const getItems = (storeName) => {		
	return new Promise((resolve) => {
		// initialize web db
		const request = indexedDB.open("fa_db", 1);
	
		request.onsuccess = () => {
		  console.log('request.onsuccess - getAllData');
		  const db = request.result;
		  const tx = db.transaction(storeName, 'readonly');
		  const store = tx.objectStore(storeName);
		  const res = store.getAll();
		  res.onsuccess = () => {
			resolve(res.result);
		  };
		};
	});
}