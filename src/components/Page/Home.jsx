import React from 'react';
import Banner from '../Homepage/Banner';
import Fivecontest from '../Homepage/Fivecontest';
import Highlights from '../Homepage/Highlights';
import Popularcontests from '../Homepage/Popularcontest';

const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            
            <Fivecontest></Fivecontest>
            <Highlights></Highlights>
            <Popularcontests></Popularcontests>
        </div>
    );
};

export default Home;