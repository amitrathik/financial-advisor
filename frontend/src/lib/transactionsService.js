const baseUrl = 'http://localhost:3000/api/transactions/'

export const getTransactions = (accountNumber) => {
  return fetch(baseUrl + accountNumber)
    .then(res => res.json())
}
