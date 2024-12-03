import React, { useState }  from 'react';

function Track(props) {
    const [trackImg, setTrackImg] = useState('');
    const [trackName, setTrackName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [artistName, setArtistName] = useState('');

    return(
        <div className="track">
            <img className="track-img" src={trackImg}/>
            <p className="track-name">{trackName}</p>
            <p className="album-name">{albumName}</p>
            <p classname="artist-name">{artistName}</p>
            <button alt="Add track to playlist">Add Track</button>
        </div>
    )
};

export default Track;