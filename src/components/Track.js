import React, { useState }  from 'react';
import './Track.css'

function Track(props) {
    const [trackImg, setTrackImg] = useState(props.albumArt);
    const [trackName, setTrackName] = useState(props.song);
    const [albumName, setAlbumName] = useState(props.album);
    const [artistName, setArtistName] = useState(props.artist);

    return(
        <>
            <img className="track-img" src={trackImg}/>
            <div className='track-info'>
                <p className="track-name">{trackName}</p>
                <p className="album-name">{albumName}</p>
                <p className="artist-name">{artistName}</p>
            </div>
        </>
    )
};

export default Track;