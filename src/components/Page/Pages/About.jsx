import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nullam vel justo nec lacus fermentum commodo. Nulla facilisi.
                    Sed faucibus dignissim est, ut posuere nisl mollis sit amet.
                    Integer non bibendum nunc. Cras auctor tortor sit amet libero
                    pharetra, at aliquam arcu tristique.
                </p>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nullam vel justo nec lacus fermentum commodo. Nulla facilisi.
                    Sed faucibus dignissim est, ut posuere nisl mollis sit amet.
                    Integer non bibendum nunc. Cras auctor tortor sit amet libero
                    pharetra, at aliquam arcu tristique.
                </p>
                <h2 className="text-2xl font-bold mb-4">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Team member cards */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">John Doe</h3>
                        <p className="text-gray-700">CEO</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
                        <p className="text-gray-700">CTO</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">Alice Johnson</h3>
                        <p className="text-gray-700">Marketing Director</p>
                    </div>
           
                </div>
            </div>
        </div>
    );
};

export default About;
