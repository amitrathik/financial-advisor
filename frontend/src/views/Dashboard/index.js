import React from "react"
const Dashboard = (props) => {

  return (
        <div>
            <div className="App">
                <div className="Header">
                    <h2>dashboard</h2>
                </div>
                <nav>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/accounts">Accounts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/transactions">Transactions</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
  )
}

export default Dashboard;
