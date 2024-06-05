import React from 'react';

const Highlights = ({ data }) => {
    // Assuming data is an array of users with count property
    const sortedCounts = data.sort((a, b) => b.count - a.count);
    const topUsers = sortedCounts.slice(0, 3);

    return (
        <div>
            <h1 className='text-center'>
                Our Top Contest Creator</h1>
                <div className="grid grid-cols-3 gap-4">
        {data.map((creator, index) => (
            <div key={index} className="card card-compact bg-base-100 shadow-xl w-96">
                <figure>
                    <img className='w-64 h-64' src={creator.user_details.Photourl} alt={creator.user_details.name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{creator.user_details.name}</h2>
                   

            
                            <h3>Best Contest {creator.contestCounts[0].contest_name}</h3>
                       
                 
            
                    <div className="card-actions justify-end">
                    <p>{`Contest Create: ${creator.totalContest}`}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
                
        </div>
  
    );
}

export default Highlights;