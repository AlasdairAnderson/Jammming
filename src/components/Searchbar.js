import React, { useState } from 'react';

function Searchbar() {
    const [searchTrack, setSearchTrack] = useState('');

    const handleChange = (e) => {
        setSearchTrack(e.target.value);
    }

    return(
        <form>
            <input id="searchTrack" name="searchTrack" type="text" onChange={handleChange} value={searchTrack}/>
            <button id="submit" type="submit">Search</button>
        </form>
    );

}

export default Searchbar;
