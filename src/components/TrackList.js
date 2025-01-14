import React, {useState} from 'react';
import Track from './Track';

function TrackList(props) {
    const tracks = props.trackList;


    return(
        <ul className="track-list">
            {tracks.map((track) => {
                return(
                <li key={track.id} className='track'>
                    <Track  albumArt={track.albumArt} song={track.name} artist={track.artist} album={track.album}/>
                    <button alt={ props.playList ? "Add track to playlist" : "Remove track to playlist" }  onClick={() => props.handleClick(track)} name={ props.playList ? 'addTrack' : 'removeTrack' } data-testid={ props.playList ? `addTrack${track.id}` : `removeTrack${track.id}` } > { props.playList ? '+' : '-' }</button>
                </li>
                );
            })}
            
        </ul>
    );
}

export default TrackList;