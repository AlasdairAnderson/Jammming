import React, { useState } from 'react';
import TrackList from './TrackList';
const ENDPOINT = 'https://api.spotify.com/v1/';

function Playlist(props) {
    const [isSaving, setIsSaving] = useState(false);

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
            const responseObject = await response.json();
            return responseObject;
        }

        throw new Error('No Response when trying to create playlist');

        } catch (error) {
            console.log(error);
        }
    }

    async function addTracksToPlayist() {
        setIsSaving(true);
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
            } else {
                throw new Error('No Response when adding tracks to playlist');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to create playlist. Please try again');  
        } finally {
            setIsSaving(false);
        }
    }

    return(
        <div className="listSection" id="playlist">
            <input id="playlistName" name="playlistName" type="text" className='input-feild' value={props.playlistName} onChange={props.handlePlaylistNameChange}/>
            <TrackList trackList={props.playListTracks} handleClick={props.handleClick} playlist={true}/>
            <button data-testid='savePlaylist' onClick={addTracksToPlayist} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
        </div>
    );

}

export default Playlist;