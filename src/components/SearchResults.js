import React, { useState, useEffect } from 'react';

import TrackList from './TrackList';


function SearchResults(props) {
    const trackList = props.searchResult

    return(
        <div className='listSection' id="searchResults">
            <h2>Results</h2>
            <TrackList trackList={trackList} updateTrackList={props.updateTrackList} handleClick={props.handleClick} playList='false' />
        </div>
    );

}

export default SearchResults;