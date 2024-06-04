

import { Link, useLoaderData, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const DetailsPage = () => {
  const { id } = useParams();
  const contest = useLoaderData();
  console.log(contest);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = (formData) => {
    console.log('Submitting assignment:', formData);
  };

  if (!contest) {
    return <p>Contest not found!</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <Helmet>
    <title>View Details </title>
    </Helmet>
      <div className="rounded-lg overflow-hidden bg-orange-200 shadow-lg" data-aos="fade-up">
        <div className="flex flex-col md:flex-row">
      
          <div className="md:w-2/3 px-6 py-4">
            <h2 className="text-3xl text-gray-800 font-bold mb-4">
              <Typewriter words={[contest.contest_name]} />
            </h2>
            <p className="text-lg text-gray-700 mb-4">Description: {contest.contest_description}</p>
            <p className="text-lg text-gray-700 mb-4">Prize Money: ${contest.Prize_money}</p>
            <p className="text-lg text-gray-700 mb-4">Contest type: {contest.contest_type}</p>
            <p className="text-lg text-gray-700 mb-4">Registration Price: ${contest.contest_price}</p>
            <p className="text-lg text-gray-700 mb-4">Created Date: {contest.created_at}</p>
            <p className="text-lg text-gray-700 mb-4">Last Submission Date: {contest.deadline} </p>
            <p className="text-lg text-gray-700 mb-4">Contest Created: {contest.creator_name}</p>
            <p className="text-lg text-gray-700 mb-4">Contest Creator Email: {contest.creator_email}</p>
            <p className="text-lg text-gray-700 mb-4">Submission Instruction: {contest.Task_submission_instruction}</p>
            <p className="text-lg text-gray-700 mb-4">Attempted Count: {contest.attemptedCount}</p>
            <Link to={`/registration/${contest._id}`} className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
              Registration 
            </Link>
          </div>
          {/* Right side with image */}
          <div className="md:w-1/3">
            <img
              src={contest.contest_image}
              alt={contest.contest_name}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
