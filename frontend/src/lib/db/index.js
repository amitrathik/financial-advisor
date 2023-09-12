// IndexDB 
const db = window.indexedDB.open("fa_db", 1);
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

	const objectStore = db.createObjectStore("accounts", {
		keyPath: "number",
	});
	objectStore.createIndex("type", "type", { unique: false });
	objectStore.createIndex("balance", "balance", { unique: false });
	objectStore.createIndex("created_at", "created_at", { unique: false });
	objectStore.createIndex("updated_at", "updated_at", { unique: false });
}