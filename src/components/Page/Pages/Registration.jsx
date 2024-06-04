import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from "../../Hook/UseAxioSecure";
const Registration = () => {
    const { id } = useParams();
    const contest = useLoaderData();
    const { user} = useAuth();
    console.log(contest);
    const axiosSecure = useAxiosSecure();

    const [paymentDetails, setPaymentDetails] = useState({
        transactionId: generateTransactionId(),
        name: user?.displayName,
        email: user?.email,
    });

    const initialFormData = {
        contestd:contest._id,
        creatorname:contest.creator_name,
        creatoremail:contest.creator_email,
        submitter_email:user?.email,
        submitter_name:user?.displayName,
        prizemoney:contest. Prize_money,
        deadline:contest.deadline,
        title:contest.contest_name,
        inputlink:"",
        notetext:"",
        status: "registration",
        marks:"0",
        feedback:"No feedback avaliable",
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
         const response = await axiosSecure.put(`/contest/update-inital/${contest._id}`)
        console.log(initialFormData);
      
        try {
          const response = await fetch(
            "http://localhost:5000/userole/post",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(initialFormData),
            }
          );
          if (!response.ok) {
            if (response.status === 400) {
       
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "This contest registration already exists.",
              });
            } else {

              throw new Error("Failed to register for contest");
            }
          } else {
     
            const data = await response.json();
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Contest registration successful.",
            });
           
            // navigate(`/assignment`);
          }
        } catch (error) {

          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to register for contest.",
          });
          console.error("Error registering for contest:", error);
        }
      };

   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value
        });
    };

    const handlePaymentNow = () => {
        // Handle payment now logic
        console.log("Payment Now", paymentDetails);
    };

    const handlePaymentLater = () => {
        console.log("Payment Later", paymentDetails);
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Thank you for choosing this contest. You can come back later to finish your payment and access it.",
        });
      };

    function generateTransactionId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return (
        <div className="container mx-auto">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg my-8">
                <div className="py-4 px-6">
                    <h1 className="text-2xl font-bold mb-4">{contest.contest_name}</h1>
                    <p className="text-gray-700 mb-4">Prize: ${contest.Prize_money}</p>
                    <p className="text-gray-700 mb-4">Registration Fee: ${contest.contest_price}</p>
                    <p className="text-gray-700 mb-4">Creator: {contest.creator_name}</p>
                    <label htmlFor="Name" className="block text-lg mb-1">Contest Registion Person name </label>
                    <input
                        type="text"
                        name="name"
                        value={paymentDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter Your Name"
                        className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
                    />
                    <label htmlFor="Name" className="block text-lg mb-1">Contest Registion Person Email </label>
                    <input
                        type="email"
                        name="email"
                        value={paymentDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter Your Email"
                        className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        name="transactionId"
                        value={paymentDetails.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter Transaction ID"
                        className="border border-gray-400 rounded-lg p-2 mb-4 w-full"
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Payment Now
                        </button>
                        <button
                            onClick={handlePaymentLater}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Payment Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
