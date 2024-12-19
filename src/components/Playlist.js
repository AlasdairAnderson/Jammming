import React from 'react';
import TrackList from './TrackList';
import './Playlist.css'
const ENDPOINT = 'https://api.spotify.com/v1/'

function Playlist(props) {

    async function createPlaylist(user) {

        try {
            console.log(user);
            const fetchURL = `${ENDPOINT}users/${user.id}/playlists`;
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${props.token.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: props.playlistName,
                    public: false
                })
            }

        const response = await fetch(fetchURL, options);

        if(response.ok){
            const responseObject = response.json();
            return responseObject;
        }

        throw new Error('No Response when trying to create playlist');

        } catch (error) {
            console.log(error);
        }
    }

    async function addTracksToPlayist() {
        try {
            const newPlaylist = await createPlaylist(props.user)
            console.log(newPlaylist);
            const fetchURL = `${ENDPOINT}playlists/${newPlaylist.id}/tracks`
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${props.token.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: props.playListTracks.map((track) => track.uri),
                    position: 0
                })
            }

            const response = await fetch(fetchURL, options);

            if(response.ok){
                alert('Playlist created and tracks added');
            }

            throw new Error('No Response when adding tracks to playlist');
        } catch (error) {
            console.log(error)   
        }
    }

    return(
        <div className="listSection">
            <input id="playlistName" name="playlistName" type="text" className='input-feild' value={props.playlistName} onChange={props.handlePlaylistNameChange}/>
            <TrackList trackList={props.playListTracks} handleClick={props.handleClick} playlist='true'/>
            <button onClick={() => {
                addTracksToPlayist();
            }}>Save</button>
        </div>
    );

}

export default Playlist;