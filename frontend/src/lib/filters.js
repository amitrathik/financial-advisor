export const filterTransactions = (accountNumber = '', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.description.includes(`${accountNumber}`)
    })
}
export const getCreditCardPayments = (cardNumber = '5550', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Card Ending IN ${cardNumber}`) ? transaction.Description.includes(`Card Ending IN ${cardNumber}`) : transaction.Description.includes(`card ending in ${cardNumber}`)
    });

}

export const getToChkAcctTransfers = (accountNumber = '5962', transactions) => {
    console.log(accountNumber)
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Online Transfer To Chk …${accountNumber}`) ||transaction.Description.includes(`Online Transfer to CHK ...${accountNumber}`)
    })
}

export const getFromChkAcctTransfers = (accountNumber = '5962', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Online Transfer From Chk …${accountNumber}`) ||transaction.Description.includes(`Online Transfer from CHK ...${accountNumber}`)
    })
}

export const getToZellePayments = (accountName = 'KESHAVLAL RATHI', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Zelle payment to ${accountName}`)
    })
}

export const getFromZellePayments = (accountName = 'KESHAVLAL RATHI', transactions) => {
    return transactions.filter((transaction) => {
        return transaction.Description.includes(`Zelle payment from ${accountName}`)
    })
}

