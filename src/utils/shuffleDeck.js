export default function shuffleDeck (deck) {
  // Shuffle a new deck using the Fisher-Yates algorithm
  let shuffledDeck = deck;
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};
