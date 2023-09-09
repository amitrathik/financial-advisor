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