import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

import { createBrowserRouter,
    Link,
    Route,
    RouterProvider,
    Routes} from 'react-router-dom'

// Services
import { getAccounts } from "./lib/accountsService";
import { getTransactions } from './lib/transactionsService';
import { getCards } from "./lib/cardsService";

// Views
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
    { path: "*", Component: Root },
]);

function Root() {
    // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
    // component below are unchanged
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
		<Route path="/accounts" element={<Accounts />} />
		<Route path="/transactions" element={<Transactions />} />
      </Routes>
    );
  }

class App extends React.Component {
    constructor(props) {
		// lets get a DB setup in the browser for testing / local storage / demo prep
		super(props);
        this.state = {
			route : '',
			accounts: [],
			cards : [],
			selectedAccount:'',
			selectedYear:'',
			transactions : []
		};

	}

	
	componentDidMount(){
		// Promise.all([getAccounts(), getCards()])
		//  .then(([accounts, cards]) => {
		//    this.setState({
		// 		accounts : accounts, 
		// 		cards : cards
		// 	})
		//  });
	}


	handleAccountSelection = (selectedAccount) => {
		getTransactions(selectedAccount).then((transactions) => {
			this.setState({
				selectedAccount : selectedAccount,
				transactions : transactions
			})
		});
	}

	resetAccountSelection = () => {
		this.setState({
			selectedAccount : '',
			selectedMonth : '5',
			selectedYear : '2023'
		})
	}

	handleYearSelection = (evt) => {
		this.setState({
			selectedYear : evt.target.value
		})
	}

	handleMonthSelection = (evt) => {
		console.log(evt.target.value)
		this.setState({
			selectedMonth : evt.target.value
		})
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
