
import DatePicker from 'react-datepicker';
import moment from 'moment';
import  { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from "sweetalert2";
import 'react-datepicker/dist/react-datepicker.css';
import AOS from "aos"; 
import "aos/dist/aos.css"; 
import { Helmet } from 'react-helmet-async';

const AddContest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


const generateButtonColor = () => {

const colors = ["#3366FF","#FF5733", "#33FF5A","#FF33FF","#33FFFF","#FF9933","#CC33FF","#33FFCC","#FF3366","#FFFF33"];
return colors[Math.floor(Math.random() * colors.length)];
  };


  const buttonColor = generateButtonColor();

 

  
  
  const initialFormData = {
    contest_name: "",
    contest_image: "",
    contest_description: "",
    Prize_money: "",
    Task_submission_instruction: "",
    status: "pending",
    contest_type: "",
    deadline:  new Date(),
    contest_colour:buttonColor ,
    creator_email: user?.email,
    creator_name: user?.displayName,
    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    updated_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    comments: "",
    contest_price: "",
    attemptedCount:0,
  };
  

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    AOS.init(); 
  }, []); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChanges = (date) => {
    setFormData({ ...formData, deadline: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        "http://localhost:5000/contest/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add Contest ");
      }
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Contest added successfully",
      });
    //   navigate(`/viewdetails/${data.insertedId}`);
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add Contest",
      });
      console.error("Error adding Assignment:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
    <title>Create |Add Contest</title>
    </Helmet>
    <h1 className="text-3xl font-semibold mb-4 text-center">Create Contest</h1>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="Name" className="block text-lg mb-1">Name</label>
        <input
          type="text"
          id="contest_name"
          name="contest_name"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-lg mb-1">Description</label>
        <textarea
          id="contest_description"
          name="contest_description"
   
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Prize money" className="block text-lg mb-1">Prize money</label>
        <input
          type="number"
          id="Prize_money"
          name="Prize_money"
     
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Registration Price" className="block text-lg mb-1">Registration Price</label>
        <input
          type="number"
          id="contest_price"
          name="contest_price"
     
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

           <div className="mb-4">
        <label htmlFor="Image" className="block text-lg mb-1">Image url</label>
        <input
          type="text"
          id="contest_image"
          name="contest_image"
   
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Contest type" className="block text-lg mb-1">Contest type</label>
        <select
          id="contest_type"
          name="contest_type"
   
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
        <option value="">Select</option>
          <option value="image-design">Image design</option>
          <option value="article-writing">Article writing</option>
          <option value="marketing-strategy">Marketing strategy</option>
 <option value="digital-advertisement">Digital advertisement</option>
          <option value="gaming-Review">Gaming Review</option>
          <option value="book-review">Book review</option>
<option value="business-Idea">Business Idea</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="Task_submission_instruction" className="block text-lg mb-1">Task Submission Instruction</label>
        <textarea
          id="Task_submission_instruction"
          name="Task_submission_instruction"
   
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Deadline" className="block text-lg mb-1">Deadline</label>
        <DatePicker
  selected={formData.deadline}
  onChange={handleChanges}
  className="w-full px-3 py-2 border rounded-lg"
  required
/>
      </div>
      <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
            Create Contest
          </button>
        </div>
    </form>
  </div>
  );
};

export default AddContest;