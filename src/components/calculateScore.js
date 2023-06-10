
export default function CalculateScore(hand) {
  let score = 0;
  hand.forEach((card) => {
    if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
      score += 10;
    } else if (card.rank === 'A') {
      if (score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    } else {
      score += parseInt(card.rank);
    }
  });
  return score;
};
