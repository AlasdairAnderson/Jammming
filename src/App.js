import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Jammming</h1>
        <p className="App-slogan">Search Spotify and build your ultimate playlist</p>
      </header>
      <SearchResults />
    </div>
  );
}

export default App;
