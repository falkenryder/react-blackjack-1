
// Modify the function calculateScore so that it returns the correct score for the hand
export default function calculateScore (cards) {
  let total = 0;
  cards.forEach((card) => {
    if (card.hidden === false && card.value !== 'A') {
      if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    }
  });

  const aces = cards.filter((card) => {
    return card.value === 'A';
  });
  aces.forEach((card) => {
    if (card.hidden === false) {
      if (total + 11 > 21) {
        total += 1;
      } else if (total + 11 === 21) {
        if (aces.length > 1) {
          total += 1;
        } else {
          total += 11;
        }
      } else {
        total += 11;
      }
    }
  });
  return total;
};
