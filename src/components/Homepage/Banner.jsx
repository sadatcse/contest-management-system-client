import React from 'react';

const Banner = () => {
    return (
        <div className="bg-gray-200 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-76">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center pt-10">Welcome to Our Contests Platform</h1>
                <p className="mt-2 text-xl text-gray-600 text-center">Find and participate in exciting contests!</p>
                <div className="mt-8 flex justify-center ">
                    <div className="max-w-lg w-full ">
                        <label htmlFor="search" className="sr-only">Search contests by tags</label>
                        <div className="relative">
                            <input id="search" className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500" type="text" placeholder="Search contests by tags..." />
                            <button className="absolute right-0 top-0 mt-3 mr-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Search</button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="flex flex-wrap justify-center">
                        <span className="m-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Programming</span>
                        <span className="m-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Design</span>
                        <span className="m-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Writing</span>
                        <span className="m-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">Art</span>
                        {/* Add more tags as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;