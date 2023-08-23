const baseUrl = 'http://localhost:3000/api/cards/'

export const getCards = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}
