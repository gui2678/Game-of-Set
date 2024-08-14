function dealNewCards(numCards = 3) {
    const newCards = [];
    for (let i = 0; i < numCards; i++) {
        if (deck.length > 0) {
            const newCard = deck.pop();  // Remove a card from the deck
            newCards.push(newCard);      // Add it to the newCards array
            printCard(newCard, active.length + i);  // Print each new card
        }
    }
    // Add each card individually  
    for (let card of newCards) {
        active.push(card);
    }
}
