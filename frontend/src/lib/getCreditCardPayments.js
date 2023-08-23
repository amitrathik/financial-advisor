const getCreditCardPayments = (cardNumber = '5550', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Card Ending IN ${cardNumber}`) ? transaction.Description.includes(`Card Ending IN ${cardNumber}`) : transaction.Description.includes(`card ending in ${cardNumber}`)
    });

}

export default getCreditCardPayments;