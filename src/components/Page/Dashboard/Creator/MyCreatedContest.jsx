


import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import { FaRemoveFormat, FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../providers/AuthProvider';

const MyCreatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const [count, setCount] = useState(0);
    const [selectedContest, setSelectedContest] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const { user } = useContext(AuthContext);
    const email= user?.email
    const { data: ContestsData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/contest/get-email/${email}`);
                setCount(res.data.length); 
                return res.data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    const contests = Array.isArray(ContestsData) ? ContestsData : [];

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const updateContestData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return contests.slice(startIndex, endIndex);
    };


     const handleConfirm = async (contestId) => {
        console.log(contestId)
     }


    const handleDelete = async (contestId) => {
        try {
            await axiosSecure.delete(`/contest/delete/${contestId}`);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Contest deleted successfully!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            refetch();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete contest!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">All Contests</h2>
                <h2 className="text-3xl font-bold">Total Contests: {ContestsData.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Contest Name</th>
                            <th className="px-4 py-2">Prize Money</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Delete</th>
                            <th className="px-4 py-2">Edit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {updateContestData().map((contest, index) => (
                            <tr key={contest._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{contest.contest_name}</td>
                                <td className="border px-4 py-2">{contest.Prize_money}</td>
                                <td className="border px-4 py-2">{contest.status}</td>
             
                                <td className="border px-4 py-2">
                                    {contest.status === 'confirmed' ? (
        <button
            onClick={() => handleDelete(contest._id)}
            className="text-green-600 hover:text-green-800"
        >
          <FaTrashAlt />
        </button>
    ) : (
        <span>Already Approve</span>
    )}
</td>
                                <td className="border px-4 py-2">
                                    {contest.status === 'confirmed' ? (
   <button
   onClick={() => handleConfirm(contest._id)}
   className="text-green-600 hover:text-green-800 focus:outline-none"
>
   Edit
</button>
    ) : (
        <span>Already Approve</span>
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
       <h1 className="text-xl font-bold mb-4">Comments for {selectedContest.contest_name}</h1>
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
    Update Comment
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

export default MyCreatedContest;
