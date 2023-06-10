import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import GenerateDeck from '../components/generateDeck';

  test('expect dealer to get 2 cards', () => {
    render(<GenerateDeck />);
    const initializeButton = screen.getByText('Initialize Deck');

    fireEvent.click(initializeButton);

    const test = screen.getAllByTestId('dealersHand');

    expect(test).toHaveLength(2);
  });

  test('expect player to get 2 cards', () => {
    render(<GenerateDeck />);
    const initializeButton = screen.getByText('Initialize Deck');

    fireEvent.click(initializeButton);

    const test = screen.getAllByTestId('playersHand');

    expect(test).toHaveLength(2);
  });
