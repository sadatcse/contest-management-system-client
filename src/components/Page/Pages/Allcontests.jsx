import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Allcontests = () => {
    const contestdata = useLoaderData();
    const [activeTab, setActiveTab] = useState(null);

    // Filter contests based on activeTab
    const filteredContests = activeTab ? contestdata.filter(contest => contest.contest_type.includes(activeTab)) : contestdata;

    return (
        <div>
            <h1>All contests</h1>
            <div className="grid grid-cols-9 gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab(null)}>All</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('image-design')}>Image Design</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('article-writing')}>Article Writing</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('marketing-strategy')}>Marketing Strategy</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('digital-advertisement')}>Digital Advertisement</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('gaming-Review')}>Gaming Review</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('book-review')}>Book Review</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('business-Idea')}>Business Idea</button>
                </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                {/* Tab View */}

                {/* Render contests */}
                {filteredContests.map(contest => (
                   <div key={contest._id} className="card w-96 bg-base-100 shadow-xl" style={{ backgroundColor: contest.contest_colour }}>
                        <figure><img className='h-64 w-96' src={contest.contest_image} alt={contest.contest_name} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{contest.contest_name}</h2>
                            <p>{contest.contest_description.slice(0, 50)}...</p>
                            <div className="card-actions justify-end">
                            <button 
  onClick={() => handleDetailsClick(contest._id)} 
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Details
</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allcontests;
