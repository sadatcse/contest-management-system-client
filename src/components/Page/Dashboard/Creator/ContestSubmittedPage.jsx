import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/UseAxioSecure";
import useAuth from '../../../Hook/useAuth';
import moment from 'moment';
import Swal from 'sweetalert2';

const ContestSubmittedPage = () => {
    const axiosSecure = useAxiosSecure();
    const [count, setCount] = useState(0);
    const [selectedContest, setSelectedContest] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [Contests_result, setContests_result] = useState(null);
    const { user} = useAuth();
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

    const handleContestClick = async (contestId) => {
        console.log("Clicked Contest ID:", contestId);
        setSelectedContest(contestId);
        try {
          const response = await axiosSecure.get(`/userole/get-cid/${contestId}`);
          setContests_result(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
      };
      const finalwin = async (contestId) => {
       
        try {
          const response = await axiosSecure.put(`/userole/status/${contestId}`, { status: 'win' });
  
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          setSelectedContest(null);
          return response.data;
        } catch (error) {
          console.error('Error updating contest status:', error.response.data.message);
          

          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.message,
          });
    
          throw error;
        }
      };
    
      
    
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">My Creator Contest List</h2>
                <h2 className="text-3xl font-bold">Total Contests Created by me: {ContestsData.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Contest Name</th>
                            <th className="px-4 py-2">Prize Money</th>
                            <th className="px-4 py-2">Deadline</th>
                     
                        </tr>
                    </thead>
                    <tbody>
                        {updateContestData().map((contest, index) => (
                            <tr key={contest._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2 text-center" onClick={() => handleContestClick(contest._id)}>{contest.contest_name}</td>
                                <td className="border px-4 py-2 text-center">{contest.Prize_money}</td>
                                <td className="border px-4 py-2 text-center">{moment(contest.deadline).format('MMMM Do YYYY')} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedContest && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-xl font-bold mb-4">Participant Information</h1>
                        <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">participant Name</th>
                            <th className="px-4 py-2">participant Email</th>
                            <th className="px-4 py-2">submitted task</th>
                            <th className="px-4 py-2"> Declare Win</th>
                           
                     
                        </tr>
                    </thead>
                    <tbody>
    {Contests_result && Contests_result.map((contest, index) => (
        <tr key={contest._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2 text-center" >{contest.submitter_name}</td>
            <td className="border px-4 py-2 text-center">{contest.submitter_email}</td>
            <td className="border px-4 py-2 text-center">{contest.inputlink} </td>
            <td className="border px-4 py-2">
    {contest.status === "win" ? (
        <p>Already win</p>
    ) : (
        <button onClick={() => finalwin(contest._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Declare Win
        </button>
    )}
</td>
        </tr>
    ))}
</tbody>
                </table>
            </div>
                        <button onClick={() => setSelectedContest(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close </button>
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

export default ContestSubmittedPage;
