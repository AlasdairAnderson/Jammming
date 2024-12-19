import React, { useState, useEffect } from 'react';

import TrackList from './TrackList';
import './SearchResults.css'


function SearchResults(props) {
    const trackList = props.searchResult

    return(
        <div className='listSection'>
            <h2>Results</h2>
            <TrackList trackList={trackList} updateTrackList={props.updateTrackList} handleClick={props.handleClick} playList='false' />
        </div>
    );

}

export default SearchResults;