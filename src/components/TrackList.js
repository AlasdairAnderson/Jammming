import React, {useState} from 'react';
import Track from './Track';
import './TrackList.css';

function TrackList(props) {
    const tracks = props.trackList;


    return(
        <ul className="track-list">
            {tracks.map((track) => {
                return(
                <li key={track.id} className='track'>
                    <Track  albumArt={track.albumArt} song={track.name} artist={track.artist} album={track.album}/>
                    <button alt="Add track to playlist" onClick={() => props.handleClick(track)} > { props.playList ? '+' : '-' }</button>
                </li>
                );
            })}
            
        </ul>
    );
}

export default TrackList;