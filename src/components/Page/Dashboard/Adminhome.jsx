import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Adminhome = () => {
    const contestdata = useLoaderData();

    // Function to calculate percentage change
    const calculatePercentageChange = (previousValue, currentValue) => {
        if (previousValue === 0) return 0; // Avoid division by zero
        return ((currentValue - previousValue) / previousValue) * 100;
    };

    // Calculate percentage change for each statistic
    const contestPercentageChange = calculatePercentageChange(contestdata.previousContestCount, contestdata.contestCount);
    const appliedPercentageChange = calculatePercentageChange(contestdata.previousAppliedCount, contestdata.appliedCount);

    return (
        <div className="flex justify-center items-center h-screen">
    <div className="stats stats-vertical lg:stats-horizontal shadow">
  
                <div className="stat">
                    <div className="stat-title">User Registration</div>
                    <div className="stat-value">{contestdata.userCount}</div>
                    <div className="stat-desc">Jan 1st - Dec 1st</div>
                </div>
  
                <div className="stat">
                    <div className="stat-title">New Contest</div>
                    <div className="stat-value">{contestdata.contestCount}</div>
                    <div className="stat-desc">{contestPercentageChange > 0 ? '↗︎' : '↘︎'} {Math.abs(contestPercentageChange)}% ({contestPercentageChange > 0 ? '+' : ''}{contestdata.contestCount - contestdata.previousContestCount})</div>
                </div>
  
                <div className="stat">
                    <div className="stat-title">Apply contest</div>
                    <div className="stat-value">{contestdata.appliedCount}</div>
                    <div className="stat-desc">{appliedPercentageChange > 0 ? '↗︎' : '↘︎'} {Math.abs(appliedPercentageChange)}% ({appliedPercentageChange > 0 ? '+' : ''}{contestdata.appliedCount - contestdata.previousAppliedCount})</div>
                </div>
  
            </div>
        </div>
    );
};

export default Adminhome;