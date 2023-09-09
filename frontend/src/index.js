import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

import { createBrowserRouter,
    Link,
    Route,
    RouterProvider,
    Routes} from 'react-router-dom'


// Routes
import Root from "./routes/root";
import Contact from "./routes/contact";


// Services
import { getAccounts } from "./lib/accountsService";
import { getTransactions } from './lib/transactionsService';
import { getCards } from "./lib/cardsService";

// Views
import ErrorPage from "./views/ErrorPage";
import Dashboard from './views/Dashboard';
import Accounts from "./views/Accounts";
import Transactions from "./views/Transactions";

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



const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Root />,
	  errorElement: <ErrorPage />,
	  children: [
		{
		  path: "contacts/:contactId",
		  element: <Contact />,
		},
	  ],
	}
]);

class App extends React.Component {
    constructor(props) {
		super(props);
	}

    render() {
        return (
            <RouterProvider router={router} />
        );
    }
}
  
ReactDOM.render(
	<App />,
	document.getElementById("root")
);