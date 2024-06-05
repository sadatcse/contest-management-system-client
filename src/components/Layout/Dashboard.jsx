
import React, { useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { 
  FaBox, 
  FaEye, 
  FaTruck, 
  FaHome, 
 FaInfoCircle,
  FaUser 
} from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../Hook/useAdmin';



const Dashboard = () => {

  const companyLogo = "https://i.ibb.co/jLBtFLj/logo.png";
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  let dashboardOptions = null;
  const { userType, loading: adminLoading } = useAdmin();

  const userRole = userType;

  if (userRole === 2) { //user
    dashboardOptions = (
      <>
        <li>
          <NavLink to="/dashboard/userhome" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaHome className="mr-2" /> User Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/myparticipate" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaBox className="mr-2" /> My Participated Contest
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mywin" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaEye className="mr-2" /> My Winning Contest 
          </NavLink>
        </li>
      </>
    );
  }

  if (userRole === 1) { //admin
    dashboardOptions = (
      <>
        <li>
          <NavLink to="/dashboard/adminhome" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaHome className="mr-2" /> Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageusers" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaBox className="mr-2" /> Manage User
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/managecontest" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaEye className="mr-2" /> Manage Contest 
          </NavLink>
        </li>
      </>
    );
  }

  if (userRole === 3) { //creator
    dashboardOptions = (
      <>
        <li>
          <NavLink to="/dashboard/creatorhome" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaHome className="mr-2" /> Creator Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/addcontest" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaBox className="mr-2" /> Add Contest Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/submitcontest" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaEye className="mr-2" /> My Created Contest 
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mycreate" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
            <FaTruck className="mr-2" /> Contest Submitted Page
          </NavLink>
        </li>
      </>
    );
  }
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'User logged out successfully',
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'Logout failed. Please try again later.',
        });
        console.error(error);
      });
  };

  const navigateRole = (userRole) => {
    useEffect(() => {
      if (userRole == 2) {
        navigate('/dashboard/userhome');
      } else if (userRole == 3) {
        navigate('/dashboard/creatorhome');
      } else if (userRole == 1) {
        navigate('/dashboard/adminhome');
      }
    }, [userRole, navigate]);
  };

  navigateRole(userRole);

  return (
    <div className='flex flex-col h-screen'>
      <header className="bg-gray-800 text-white py-4 flex justify-center items-center">
        <img src={companyLogo} alt="Company Logo" className="h-12 mr-4" />
      </header>
      

      <div className='flex flex-1'>
        <div className='w-64 min-h-full bg-gradient-to-b from-orange-400 to-orange-600 p-4'>
          <div className="flex items-center justify-between mb-6">

          </div>
          <ul className='menu'>
            {dashboardOptions}
            <li>
              <NavLink to="/dashboard/profile" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
                <FaUser className="mr-2" /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={handleLogOut} className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
                <FaUser className="mr-2" /> Logout
              </NavLink>
            </li>
            <hr className="my-4 border-gray-300" />
            <div className="text-white text-lg font-bold mb-2 text-center">
              Website Pages
            </div>
            <li>
              <NavLink to="/" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
                <FaHome className="mr-2" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="flex items-center py-2 px-4 text-white hover:bg-orange-500">
                <FaInfoCircle className="mr-2" /> About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='flex-1 p-4'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
