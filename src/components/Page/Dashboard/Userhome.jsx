import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from "../../Hook/UseAxioSecure";
import useAuth from '../../Hook/useAuth';
import { useQuery } from "@tanstack/react-query";
import Registration from './../Pages/Registration';

const Userhome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;



    const { data: contestsData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/userole/stat/${email}`);
                return res.data;
            } catch (error) {
                throw new Error(error);
            }
        },

    });

    const totalRegistrations = contestsData.registration || 1; 
    const winPercentage = (contestsData.win / totalRegistrations) * 100;
    const total =(contestsData.registration+contestsData.win);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
   
                    <div className="stat-title">Total Registration</div>
                    <div className="stat-value">{total}</div>

                </div>
                <div className="stat">
                    <div className="stat-title">Win Contest</div>
                    <div className="stat-value">{contestsData.win}</div>
         
                </div>
                <div className="stat">
                    <div className="stat-title">Win Percent contest</div>
                    <div className="stat-value">{winPercentage}%</div>
                 
                </div>
            </div>
        </div>
    );
};

export default Userhome;
