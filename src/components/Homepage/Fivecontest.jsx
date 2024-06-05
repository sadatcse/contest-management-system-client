import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/UseAxioSecure";

const Fivecontest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: ContestsData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/contest/get-all');
                return res.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    const sortedContests = ContestsData.sort((a, b) => b.attemptedCount - a.attemptedCount).slice(0, 6);

    return ( <div className='mt-5 mb-5'>
    <div className="grid grid-cols-3 gap-1">
            {sortedContests.map(contest => (
                <div className="card w-96 bg-base-100 shadow-xl mb-5" key={contest._id}>
                    <figure><img src={contest.contest_image} alt={contest.contest_name} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{contest.contest_name}</h2>
                        <p>Attempted Count: {contest.attemptedCount}</p>
                        <p>Description: {contest.contest_description.slice(0, 100)}...</p>
                        <div className="card-actions justify-end">
                            <Link to={`/details/${contest._id}`} className="btn btn-primary">Details</Link>
                        </div>
                    </div>
                </div>
            ))}
          
        </div>
        <Link to="/contest" className="btn btn-primary mt-5 mb-5">Show All</Link>
    </div>
    
    );
};

export default Fivecontest;
