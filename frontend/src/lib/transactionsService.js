const baseUrl = 'http://localhost:3000/api/transactions/2976'

export const getTransactions = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}
