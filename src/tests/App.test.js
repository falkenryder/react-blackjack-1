/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'; // Import the act function

import App from '../App';

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the initial message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to React Blackjack! Place your bet to begin./i)).toBeInTheDocument();
  });

  test('displays the wallet', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#wallet')).toBeInTheDocument();
  });

  test('updates game status after placing a bet', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    expect(screen.queryByText(/Place your bet to begin./i)).not.toBeInTheDocument();
    expect(container.querySelector('#dealer-hand')).toBeInTheDocument();
    expect(container.querySelector('#player-hand')).toBeInTheDocument();
  });

  test('expect dealer to get 2 cards', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    const dealerHand = container.querySelector('#dealer-hand');
    const cards = dealerHand.querySelectorAll('.card');
    expect(cards).toHaveLength(2);
  });

  test('expect player to get 2 cards', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    const playerHand = container.querySelector('#player-hand');
    const cards = playerHand.querySelectorAll('.card');
    expect(cards).toHaveLength(2);
  });

  test('expect one of the dealer card to be hidden', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    const dealerHand = container.querySelector('#dealer-hand');
    const hiddenCard = dealerHand.querySelectorAll('.hiddenCard');
    expect(hiddenCard).toHaveLength(1);
  });

  test('allows the player to hit', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    const hitButton = screen.queryByText(/Hit/i);
    act(() => {
      if (hitButton) {
        userEvent.click(hitButton);
      }
    });

    const playerHand = container.querySelector('#player-hand');
    const cards = playerHand.querySelectorAll('.card');
    expect(cards).toHaveLength(3);
  });

  test('allows the player to stand and dealer to reveal the hidden card', () => {
    const { container } = render(<App />);
    const betInput = container.querySelector('#bet-amount');
    const betButton = screen.getByRole('button', { name: /Bet/i });

    act(() => {
      userEvent.type(betInput, '10');
      userEvent.click(betButton);
    });

    const standButton = screen.getByText(/Stand/i);
    act(() => {
      if (standButton) {
        userEvent.click(standButton);
      }
    });

    const dealerHand = container.querySelector('#dealer-hand');
    const hiddenCard = dealerHand.querySelectorAll('.hiddenCard');
    expect(hiddenCard).toHaveLength(0);
  });

});
