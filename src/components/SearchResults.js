import React from 'react';
import Searchbar from './Searchbar';
import TrackList from './TrackList';

function SearchResults() {

    return(
        <div className='searchResults'>
            <Searchbar />
            <TrackList />
        </div>
    );

}

export default SearchResults;