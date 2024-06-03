import React, { useState } from 'react';
import { MdManageSearch } from 'react-icons/md';

const Banner = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchSubmit = () => {
        console.log('Search Text:', searchText);
 
    };

    return (
        <div>
            <p>
            The banner section will have a search bar. Your search word should
be based on contests tags. The search implementation functionality
should be done in the backend. Also, you make this section unique
and look beautiful section
            </p>
     
        </div>
    );
};

export default Banner;
