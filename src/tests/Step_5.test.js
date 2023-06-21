import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { checkWin, printMessage } from '../utils/checkWin';
import App from '../App';
import * as shuffleDeckModule from '../utils/shuffleDeck';

jest.mock('../utils/shuffleDeck');

describe('App- wallet mechanics', () => {
  const setup = () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '50' } });
    fireEvent.click(buttonElement);
  }

  afterEach(() => {
    shuffleDeckModule.default.mockClear();
  });

  it('pays out 1 to 1 if player wins', () => {
    shuffleDeckModule.default.mockReturnValue([
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: '10' },
      { suit: 'clubs', value: 'K' },
      { suit: 'hearts', value: '7' },
      { suit: 'spades', value: '9' },
    ]);

    setup();

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    const walletAmount = screen.getByText(/Wallet: \$150/i);
    expect(walletAmount).toBeInTheDocument();
  });

  it('pays out 3 to 2 if player gets blackjack', () => {
    shuffleDeckModule.default.mockReturnValue([
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: '10' },
      { suit: 'clubs', value: 'J' },
      { suit: 'hearts', value: '7' },
      { suit: 'spades', value: 'A' },
    ]);

    setup();

    const walletAmount = screen.getByText(/Wallet: \$175/i);
    expect(walletAmount).toBeInTheDocument();
  });

  it('returns player\'s bet if the game pushes', () => {
    shuffleDeckModule.default.mockReturnValue([
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: 'A' },
      { suit: 'clubs', value: 'J' },
      { suit: 'hearts', value: '10' },
      { suit: 'spades', value: 'A' },
    ]);

    setup();

    const walletAmount = screen.getByText(/Wallet: \$100/i);
    expect(walletAmount).toBeInTheDocument();
  });

  it('does not pay out if the player loses', () => {
    shuffleDeckModule.default.mockReturnValue([
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: 'A' },
      { suit: 'clubs', value: 'J' },
      { suit: 'hearts', value: '10' },
      { suit: 'spades', value: '9' },
    ]);

    setup();

    const walletAmount = screen.getByText(/Wallet: \$50/i);
    expect(walletAmount).toBeInTheDocument();
  });
});

describe('App- handling out of credits', () => {
  const setup = () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '100' } });
    fireEvent.click(buttonElement);
  }

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    shuffleDeckModule.default.mockClear();
  });

  it('alerts the player when they are out of credits and tops up back to original amount', () => {
    shuffleDeckModule.default.mockReturnValue([
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: 'A' },
      { suit: 'clubs', value: 'J' },
      { suit: 'hearts', value: '10' },
      { suit: 'spades', value: '9' },
    ]);

    setup();

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("You're broke!! - Here's more credits, don't give up! 💪");

    window.alert.mockRestore();

    const walletAmount = screen.getByText(/Wallet: \$100/i);
    expect(walletAmount).toBeInTheDocument();
  });
});

describe('App- resetting the game', () => {
  const setup = () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '50' } });
    fireEvent.click(buttonElement);
  }

  beforeEach(() => {
    shuffleDeckModule.default.mockImplementation(() => [
      { suit: 'hearts', value: '5' },
      { suit: 'hearts', value: '8' },
      { suit: 'clubs', value: 'J' },
      { suit: 'hearts', value: '10' },
      { suit: 'spades', value: '9' },
    ]);
  });

  afterEach(() => {
    shuffleDeckModule.default.mockClear();
  });

  it('allows the player to start a new game of blackjack after game over', () => {
    setup();

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    const newGameButton = screen.getByRole('button', {name: /New Game/i});
    expect(newGameButton).toBeInTheDocument();
  });

  it('implements the correct steps when resetting the game', () => {
    setup();

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    const newGameButton = screen.getByRole('button', {name: /New Game/i});
    fireEvent.click(newGameButton);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});
    const cardElements = screen.queryAllByTestId('card');
    const messageElement = screen.queryByText(/You Win!/i);
    const dealerScore = screen.queryByTestId('dealer-score');
    const playerScore = screen.queryByTestId('player-score');
    expect(cardElements).toHaveLength(0);
    expect(dealerScore).toBeNull();
    expect(playerScore).toBeNull();
    expect(messageElement).toBeNull();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('resets the bet and input fields when starting a new game', () => {
    setup();

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    const newGameButton = screen.getByRole('button', {name: /New Game/i});
    fireEvent.click(newGameButton);

    const inputElement = screen.getByLabelText('Place your bet:');
    const betAmount = screen.getByText("Bet: $");
    expect(inputElement).toHaveValue(null);
    expect(betAmount).toBeInTheDocument();
  });

  it('re-shuffles the deck when resetting the game', () => {
    render(<App />);

    var inputElement = screen.getByLabelText('Place your bet:');
    var buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '50' } });
    fireEvent.click(buttonElement);

    const standButton = screen.getByText(/STAND/i);
    fireEvent.click(standButton);

    const newGameButton = screen.getByRole('button', {name: /New Game/i});
    fireEvent.click(newGameButton);

    inputElement = screen.getByLabelText('Place your bet:');
    buttonElement = screen.getByRole('button', {name: /Bet/i});
    fireEvent.change(inputElement, { target: { value: '50' } });
    fireEvent.click(buttonElement);


    expect(shuffleDeckModule.default).toHaveBeenCalledTimes(2);
    const cardElements = screen.queryAllByTestId('card');
    expect(cardElements).toHaveLength(4);
  });
});
