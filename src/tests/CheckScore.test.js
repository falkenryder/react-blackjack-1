import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import GenerateDeck from '../components/generateDeck';

import { DealCard } from '../components/dealCard';

test('expect to see players score', () => {
  render(<DealCard />);
  render(<GenerateDeck />);
  const initializeButton = screen.getByText('Initialize Deck');

  fireEvent.click(initializeButton);

  const scoreElement = screen.getByTestId('playersScore');
  const scoreText = scoreElement.textContent;
  const displayedPlayerScore = parseInt(scoreText.split(':')[1].trim()); // this is the score displayed on the screen

  expect(Number.isInteger(displayedPlayerScore)).toBe(true);

  const calculateScore = (array) => { // this is the score that should be displayed
    let sum = 0;

    array.forEach((element) => {
      if (element === 'J' || element === 'Q' || element === 'K') {
        sum += 10;
      } else if (element === 'A') {
        if (sum + 11 > 21) {
          sum += 1;
        } else {
          sum += 11;
        }
      } else {
        sum += element;
      }
    });

    return sum;
  };

  const playersCardValues = screen.getAllByTestId('playersHand').map((card) => parseInt(card.textContent.replace(/[^0-9]/g, '')));

  const expectedPlayerScore = calculateScore(playersCardValues);

  expect(expectedPlayerScore).toBe(displayedPlayerScore)
});
