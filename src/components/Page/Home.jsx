import React from 'react';
import Banner from '../Homepage/Banner';
import Fivecontest from '../Homepage/Fivecontest';
import Highlights from '../Homepage/Highlights';
import Popularcontests from '../Homepage/Popularcontest';
import useAxiosSecure from "../Hook/UseAxioSecure";
import { useLoaderData } from 'react-router-dom';
const Home = () => {
    const contestdata = useLoaderData();

    return (
        
        <div>
            <Banner></Banner>
            <Fivecontest></Fivecontest>
            <Highlights data={contestdata}></Highlights>
            <Popularcontests></Popularcontests>
        </div>
    );
};

export default Home;