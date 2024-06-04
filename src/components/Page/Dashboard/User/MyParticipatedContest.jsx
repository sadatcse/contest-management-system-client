

import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaRemoveFormat, FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import useAuth from '../../../Hook/useAuth';

const MyParticipatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const [count, setCount] = useState(0);
    const [selectedContest, setSelectedContest] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const [comment, setComment] = useState(""); 
    const { user} = useAuth();
    const email= user?.email
    const { data: ContestsData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/userole/get-email/${email}`);
                setCount(res.data.length); 
                return res.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    const contestsa = Array.isArray(ContestsData) ? ContestsData : [];
    const contests=contestsa.sort((a, b) => {
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
        return deadlineA - deadlineB;
    });

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const updateContestData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return contests.slice(startIndex, endIndex);
    };
    const openModal = (contest) => {
        setSelectedContest(contest);
    };


    const closeModal = () => {
        setSelectedContest(null);
    };


    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
  

    const handleUpdateComment = async(contestId, comment) => {
        console.log(contestId, comment)
        const inputlink=comment
        try {
            const response = await axiosSecure.put(`/userole/take/${contestId}`, {
                inputlink,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your Submission successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update Your Submission',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while updating the Submission',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

  setSelectedContest(null);
  refetch();
    };
    
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">My Participate Contest</h2>
                <h2 className="text-3xl font-bold">Total Contests: {ContestsData.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Contest Name</th>
                            <th className="px-4 py-2">Prize Money</th>
                            <th className="px-4 py-2">Deadline</th>
                            <th className="px-4 py-2">Submit Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updateContestData().map((contest, index) => (
                            <tr key={contest._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{contest.title}</td>
                                <td className="border px-4 py-2">{contest.prizemoney}</td>
                                <td className="border px-4 py-2">{contest.deadline}</td>
                                
                                <td className="border px-4 py-2">       {contest.inputlink === "" && (
    <button
        onClick={() => openModal(contest)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
    >
        Submit
    </button>
)}


{contest.inputlink !== "" && (
    <p>Already submitted</p>
)}
                                    </td>
      
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedContest && (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
   <div className="bg-white p-4 rounded-md">
       <h1 className="text-xl font-bold mb-4">Submit for  {selectedContest.title}</h1>
       <textarea
           value={comment}
           onChange={handleCommentChange}
           className="w-full p-2 border rounded"
           rows="4"
       ></textarea>
  <button
    onClick={() => handleUpdateComment(selectedContest._id,comment)}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
>
    Submit
</button>
       <button
           onClick={() => setSelectedContest(null)}
           className="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded"
       >
           Close
       </button>
   </div>
</div>
            )}
   {count >= 5 && (
  <div className='pagination flex items-center justify-center mt-4 space-x-4'>
    <p className='text-gray-600'>Current Page: {currentPage + 1}</p>
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      className={`px-2 py-1 rounded ${currentPage === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={currentPage === 0}
    >
      Prev
    </button>
    {[...Array(numberOfPages)].map((_, index) => (
      <button
        onClick={() => setCurrentPage(index)}
        key={index}
        className={`px-2 py-1 rounded ${currentPage === index ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-gray-400'}`}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className={`px-2 py-1 rounded ${currentPage === numberOfPages - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      disabled={currentPage === numberOfPages - 1}
    >
      Next
    </button>
    <select
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0);
      }}
      className='px-2 py-1 border border-gray-300 rounded'
    >
      <option value='5'>5</option>
      <option value='10'>10</option>
      <option value='20'>20</option>
      <option value='25'>25</option>
      <option value='50'>50</option>
    </select>
  </div>
)}
        </div>
    );
};

export default MyParticipatedContest;
