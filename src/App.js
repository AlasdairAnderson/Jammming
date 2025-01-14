import logo from './logo.svg';
import './App.css';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Searchbar from './components/Searchbar';
import { requestAuthentication, getAccessToken, getUser } from './components/Authorisation';

const CLIENTID = 'INSERT-CLIENTID';

function App() {
  const [searchResponse, setSearchResponse] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const [AuthUrl, setAuthUrl] = useState('');
  useEffect(() => {
    const url = requestAuthentication(CLIENTID);
    setAuthUrl(url);
  },[])

  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const url = window.location.href;
    try {
      const token = getAccessToken(url);

      if(token) {
        setUserToken(token);

        (async () => {
          try {
            const userData = await getUser(token);
            setUser(userData);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        })();
      }
    } catch (error) {
      console.error('Error extracting access token:', error);
    }
    
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }, []);

  

  function addTrack(track) {
    if(!playListTracks.includes(track)){
      setPlayListTracks(prev => [...prev, track])
    }
  };

  function removeTrack(track) {
    setPlayListTracks(playListTracks.filter( playlistTracks => playlistTracks !== track))
  };

  function handlePlaylistNameChange(e) {
    setPlaylistName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Jammming</h1>
        <p className="App-slogan">Search Spotify and build your ultimate playlist</p>
      </header>
      <main>
        {!userToken ? 
          <button onClick={() => (window.location.href = AuthUrl)}>Login to Spotify</button> : <><Searchbar searchResponse={setSearchResponse} token={userToken}/>
          <div className='track-components'>
            <SearchResults searchResult={searchResponse} handleClick={addTrack} />
            <Playlist playListTracks={playListTracks} handleClick={removeTrack} playlistName={playlistName} handlePlaylistNameChange={handlePlaylistNameChange} user={user} token={userToken}/>
          </div>
          </>
        }
          
      </main>
    </div>
  );
}

export default App;
