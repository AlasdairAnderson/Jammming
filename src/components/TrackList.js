import React, {useState} from 'react';
import Track from './Track';

function TrackList(props) {
    const [tracks, setTracks] = useState('');

    return(
        <div className="track-list">
            {tracks.map((track) => {
                <Track />
            })}
        </div>
    );
}

export default TrackList;