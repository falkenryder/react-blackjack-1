import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card';
import Wallet from '../components/Wallet';
import shuffleDeck from '../utils/shuffleDeck';
import deckJson from '../deck.json';

describe('shuffleDeck', () => {
  it('should shuffle the deck', () => {
    const data = JSON.parse(JSON.stringify(deckJson));
    const testDeck = JSON.parse(JSON.stringify(deckJson));

    expect(shuffleDeck(testDeck.cards)).not.toEqual(data.cards);
  });
});

describe('Wallet', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  it('should call the onBetChange callback and update state when a valid bet is placed', () => {
    const onBetChange = jest.fn();
    render(<Wallet gameStatus="bet" onBetChange={onBetChange} />);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '30' } });
    fireEvent.click(buttonElement);

    expect(onBetChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Bet: $30')).toBeInTheDocument();
    expect(screen.getByText('Wallet: $70')).toBeInTheDocument();
  });

  it('should display an error message when an invalid bet is placed', () => {
    const onBetChange = jest.fn();
    render(<Wallet gameStatus="bet" onBetChange={onBetChange} />);

    const inputElement = screen.getByLabelText('Place your bet:');
    const buttonElement = screen.getByRole('button', {name: /Bet/i});

    fireEvent.change(inputElement, { target: { value: '200' } });
    fireEvent.click(buttonElement);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Invalid bet amount! Please enter a valid amount');
  });
});


describe('Card component', () => {
  it('should apply the "red" card color class for diamond and heart suits', () => {
    render(<Card card={{ suit: 'diamonds', value: '7', hidden: false }} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card red');
  });

  it('should apply the "black" card color class for spade and club suits', () => {
    render(<Card card={{ suit: 'spades', value: 'K', hidden: false }} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card black');
  });

  it('should render the correct value and suit symbols on the card', () => {
    render(<Card card={{ suit: 'clubs', value: 'J', hidden: false }} />);
    const valueElement = screen.getByText('J');
    const suitSmallElement = screen.getAllByText('♣')[0];
    const suitElement = screen.getAllByText('♣')[1];
    expect(valueElement).toBeInTheDocument();
    expect(suitSmallElement).toBeInTheDocument();
    expect(suitElement).toBeInTheDocument();
  });

  it('should render a hidden card when `hidden` prop is true', () => {
    render(<Card card={{ suit: 'spades', value: 'A', hidden: true }} />);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card hiddenCard');
  });
});
