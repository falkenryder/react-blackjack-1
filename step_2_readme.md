## Specifications

### Shuffle a new deck

Your first task is to implement a shuffling function. In most card games, in order to achieve fairness, the deck is shuffled before the cards are dealt. In a casino, a shuffling machine is usually used to automate the process. These machines use algorithms and randomization techniques to ensure that the deck is shuffled to a high degree, making games fair and unpredictable.

One such technique is the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method). To understand this, let's assume we have an array of cards we would like to shuffle:

Starting array:

[A, 2, 3, 4, 5]

We begin by looping through the 5 indices, starting from the last (index 4).At each stage of the loop, you will select a random index among the spots you have not looped.

Since we have not looped through any position, we can select a random one from the five spots. Let's say we choose 2. We then swap the element at index 2 (3) with the element at index 4 (5):

[A, 2, 5, 4, 3]

On the second iteration, we choose a random index from 0 to 3. Let's say we choose 1. We then swap the element at index 1 (2) with the element at index 3 (4):

[A, 4, 5, 2, 3]

We continue in this manner until we reach the first index of the array, where we can no longer make any random selection at this stage because only position zero is left. Therefore, the shuffling exercise will end here. In other words, the loop ends whenever the iteration gets to position zero.

Implement this in `shuffleDeck.js`! 

### Initializing the deck state

[State](https://react.dev/learn/managing-state) in React is a built-in object in a component that stores properties or values that belong to that component. It allows components to create and manage their own data. React provides the `useState` hook with the `setState()` method for setting up and updating the state, which schedules an update to a component's state object and tells React that this component and all its children need to be re-rendered with the updated state. In `App.js`, a "fresh pack of cards" is provided for you with the line: 

```javascript
  const data = JSON.parse(JSON.stringify(deckJson));
```

We want to start the game and state with a fresh deck. Initialize the deck state with the following line:

```javascript
  const [deck, setDeck] = useState(data);
```

Here's a breakdown of the syntax:

- `useState` is a function that takes one argument, the initial state, and returns an array of two elements.
- `deck` is the current state value, which gets updated as the component re-renders.
- `setDeck` is a function that you use to update the state. It causes the component to re-render.
- `data` is the initial value of the state. This can be any data type, not just an array.
- When you call `setDeck(newStateValue)`, React re-renders your component with the new state value.

### Using useEffect to shuffle the deck

The `useEffect` hook lets you perform side effects in function components. In other words, it lets you interact with the outside world from inside your components (e.g., data fetching, subscriptions, timers, etc.).

A side effect could be as simple as changing the document title, as complex as fetching data from an API, or even as side-effectful as setting a timer.

Here's the basic usage:

```javascript
useEffect(() => {
  // Your code here
}, [dependency]);
```

The first argument is a function that React will run after each render (including the first one).
The second argument is an array of dependencies. React re-runs the effect if any of these values change. If you pass an empty array, React will run the effect only once when the  component is first rendered.

In `App.js`, use the `useEffect` hook to perform the following when the component is first rendered to ensure that the deck is shuffled and ready for the game before the player places their first bet.

1. Shuffling the deck 
2. Setting the state with the shuffled deck as the new value.

### Placing bets

In `Wallet.js`, there's a `placeBet` function:

```javascript
  const placeBet = (e) => {
    e.preventDefault();
    const bet = parseInt(inputValue);
    // Modify placeBet so that the correct states are update if the bet is valid

    alert("Invalid bet amount! Please enter a valid amount");
    setInputValue("");

  };
```

Currently this will cause the player to receive an alert and clear their input no matter what they type. This is to let the user know that their bet is invalid but we want to perform other tasks if their input is valid.

In our game, a bet is be considered valid if:

1. The bet doesn't exceed our wallet amount.
2. The betting amount is at least $10 

If a bet is valid, we want to :

1.  Set the `betAmount` state to the value of bet to reflect the pot.
2.  Initialize `newValue` as the value of `walletAmount` minus the bet.
3.  Update `walletAmount` with `newValue` .

Modify the `placeBet` function so that the correct steps are implemented depending on the validity of the bet!

### Card 

Let take a look at the Card.js component. Beneath the [destructured assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) you have 2 functions to implement; `getCardColor`, and `renderSuit`. Open the `deck.json` file, and you will find the json of the `cards` array. Each card has the following properties:

```javascript
    {
      "value": "A",
      "suit": "spades"
    }
```

There's also a 3rd property `hidden`, which we'll implement later.

A standard deck of poker cards, traditionally has 4 suits and 2 colors:

|  Suit  | Color |
| ------------ | ------------ |
|  Diamonds (♦) | Red  |
| Clubs (♣)  | Black  |
| Hearts (♥)  |  Red |
| Spades (♠) |  Black |


#### getCardColor
Let's implement the getCardColor function, to return us one of 2 strings to be used as the class name, depending on the suit:`card red`, and`card black`. 

#### renderSuit

We also want to render out the symbol, instead of the name of the suit, to display on the card. Feel free to copy and paste the symbols from the table above!


### Test and Submit
Once you're done, run `npm test`! If everything is green and you pass all the tests, submit your solutions by adding, committing and pushing your code to your repo!

```bash
git add .

git commit -m "solution for step 2 completed; passed test"

git push origin main
```

In a couple of minutes, we should receive your test results (Hit refresh if it doesn't load automatically). You will see the Mark as complete button again if you passed, and you can move on to the next step!
