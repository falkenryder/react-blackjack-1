export default function shuffleDeck (deck) {
  // Step 1.1 Shuffle a new deck using the Fisher-Yates algorithm
  // Step 1.2 Update the deck in state with the shuffled deck
  let shuffledDeck = deck;
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};
