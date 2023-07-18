// Objects and Models
const creditCards = require('../data/creditcards/credit_cards');
function getCard(cardNumber = '2976'){
	// find credit card by card number
	return creditCards.find((card) => {
		return card.currentEndingNumber == cardNumber || card.formerEndingNumbers.includes(cardNumber);
	})
}

module.exports = getCard;