import logo from './assets/logo.svg';
import './styles/App.css';
import GenerateCards from './components/deck';
import GenerateDeck from './components/generateDeck';
import DealCard from './components/dealCard';

function App() {
  return (
    <div className="App">
      <GenerateDeck />
    </div>
  );
}

export default App;
