const baseUrl = 'http://localhost:3000/api/accounts/'

export const getAccounts = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}
