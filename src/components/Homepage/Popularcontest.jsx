



import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';
import useAxiosPublic from '../Hook/useAxiosPublic';
const Popularcontest = () => {
    const [statistics, setStatistics] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/statistics/admin')
            .then(response => {
                setStatistics(response.data);
            })
            .catch(error => {
                console.error('Error fetching statistics:', error);
            });
    }, []);

    return (
        <div className="stats shadow flex justify-between m-5">
            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaBox size={32} />
                </div>
                <div className="stat-title text-center">User Registration</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={(statistics.userCount)+100} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>

            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaTruck size={32} />
                </div>
                <div className="stat-title text-center ">Number of Contest Running</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={statistics.contestCount} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>

            <div className="stat ">
                <div className="stat-figure text-secondary">
                    <FaUsers size={32} />
                </div>
                <div className="stat-title text-center">User Contest Registration</div>
                <div className="stat-value text-center">
                    {statistics ? (
                        <CountUp end={(statistics.appliedCount+200)} />
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popularcontest;