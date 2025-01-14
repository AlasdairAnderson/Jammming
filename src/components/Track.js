import React from 'react';

function Track(props) {
    const trackImg = props.albumArt || null;
    const trackName = props.song || 'Unknown Song';
    const albumName = props.album || 'Unknown Album';
    const artistName = props.artist || 'Unknown Artist';

    return(
        <>
            <img className="track-img" src={trackImg} alt={`Album art from ${trackName}`}/>
            <div className='track-info'>
                <p className="track-name">{trackName}</p>
                <p className="album-name">{albumName}</p>
                <p className="artist-name">{artistName}</p>
            </div>
        </>
    )
};

export default Track;