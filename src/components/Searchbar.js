import React, { useState } from 'react';
import './Searchbar.css'

const BASEURL = 'https://api.spotify.com/v1/search';

function Searchbar(props) {
    const [searchTrack, setSearchTrack] = useState('');
    

    const handleChange = (e) => {
        setSearchTrack(e.target.value);
    }

    async function searchTracks(e) {
        e.preventDefault();
        try {

            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${props.token.access_token}`
                }
            }
            
            const fetchURL = `${BASEURL}?q=${searchTrack}&type=track`

            const response = await fetch(fetchURL, options)

            if(response.ok){
                const responseObject = await response.json();

                const responseArray = responseObject.tracks.items.map((item) => {
                    const track = {
                        id: item.id,
                        name: item.name,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        uri: item.uri, 
                        albumArt: item.album.images[0].url
                    }

                    return track
                });

                return props.searchResponse(responseArray);
            }

            throw new Error('Request Failed!');
    
        } catch (error) {
            console.log(error);
            if(error.message === 'props.token is null'){
                alert('Please login to search for tracks');
            }
        }
    }

    

    return(
        <form className="searchFeild" onSubmit={searchTracks}>
            <input id="searchTrack" name="searchTrack" type="text" onChange={handleChange} value={searchTrack} className='input-feild'/>
            <button id="submit" type="submit">Search</button>
        </form>
    );

}

export default Searchbar;
