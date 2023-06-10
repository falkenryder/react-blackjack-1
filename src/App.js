import logo from './assets/logo.svg';
import './styles/App.css';
import GenerateCards from './components/deck';
import GenerateDeck from './components/generateDeck';
import DealCard from './components/dealCard';
import FirstTest from './components/FirstTest';

function App() {
  return (
    <div className="App">
      <GenerateDeck />
      <FirstTest />
    </div>
  );
}

export default App;
