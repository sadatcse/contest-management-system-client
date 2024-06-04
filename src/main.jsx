import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {HelmetProvider } from 'react-helmet-async';
// Import React Router dom 

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

// Import Browser Root

import Root from './components/Root';
import AuthProvider from './providers/AuthProvider';



// Registration and Login 

import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';

//Page 

import Home from './components/Page/Home';
import Error404 from './components/Page/Error404';
import Dashboard from './components/Layout/Dashboard';
import MyProfile from './components/Page/Dashboard/Universal/MyProfile';
import PrivateRoot from './components/Root/PrivateRoot';
import AdminRoute from './components/Root/AdminRoute';

//home Dashboard Login

import Userhome from './components/Page/Dashboard/Userhome';
import Adminhome from './components/Page/Dashboard/Adminhome';
import Creatorhome from './components/Page/Dashboard/Creatorhome';
//dynamic page routes


import Contest from './components/Page/Pages/Allcontests';
import About from './components/Page/Pages/About';
import DetailsPage from './components/Page/Pages/DetailsPage';

//Payment and registration

import Registration from './components/Page/Pages/Registration';

//admin dashboard routes
 
import Manageusers from './components/Page/Dashboard/Admin/ManageUser';
import Managecontest from './components/Page/Dashboard/Admin/ManageContests';

//user dashboard routes
import Mywin from './components/Page/Dashboard/User/MyWinningContestPage';
import Myprofile from './components/Page/Dashboard/User/MyProfile';
import Myparticipate from './components/Page/Dashboard/User/MyParticipatedContest';
//Creator dashboard routes
import Addcontest from './components/Page/Dashboard/Creator/AddContest';
import Submitcontest from './components/Page/Dashboard/Creator/ContestSubmittedPage';
import Mycreate from './components/Page/Dashboard/Creator/MyCreatedContest';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path:'/',
        element:<Home></Home>
        
      },
      {
        path:'/contest',
        element:<Contest></Contest>,
        loader: () => fetch('http://localhost:5000/contest/get-status/confirmed') 
      },
      
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/login',
        element:<Login></Login>
      },

      {
        path: '/register',
        element: <Register></Register>
      },
      
      {
        path: '/details/:id',
        element: <DetailsPage></DetailsPage>,    //private 
        loader: ({ params }) => fetch(`http://localhost:5000/contest/get-id/${params.id}`)
      },

      {
        path: '/registration/:id',
        element: <Registration></Registration> ,
        loader: ({ params }) => fetch(`http://localhost:5000/contest/get-id/${params.id}`)   //private 
      }
       
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoot><Dashboard></Dashboard></PrivateRoot>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path:'profile',
        element:<PrivateRoot><MyProfile></MyProfile></PrivateRoot> 
      }  ,
      {
        path:'manageusers',
        element:<PrivateRoot><Manageusers></Manageusers></PrivateRoot>   //admin
      }  ,
      {
        path:'managecontest',
        element:<PrivateRoot><Managecontest></Managecontest></PrivateRoot>  //admin
      }  ,
      {
        path:'addcontest',
        element:<PrivateRoot><Addcontest></Addcontest></PrivateRoot> //crator
      },
      {
        path:'submitcontest',
        element:<PrivateRoot><Submitcontest></Submitcontest></PrivateRoot>  //creator
      }  ,
      {
        path:'mycreate',
        element:<PrivateRoot><Mycreate></Mycreate></PrivateRoot>  //creator
      },
      {
        path:'myparticipate',
        element:<PrivateRoot><Myparticipate></Myparticipate></PrivateRoot> //user
      }  ,
      {
        path:'myprofile',
        element:<PrivateRoot><Myprofile></Myprofile></PrivateRoot> //user
      },
  
      {
        path:'mywin',
        element:<PrivateRoot><Mywin></Mywin></PrivateRoot>  //user
      }  ,
      {
        path:'creatorhome',
        element:<PrivateRoot><Creatorhome></Creatorhome></PrivateRoot> 
      }  ,
      {
        path:'userhome',
        element:<PrivateRoot><Userhome></Userhome></PrivateRoot> 
      }  ,
      {
        path:'adminhome',
        element:<PrivateRoot><Adminhome></Adminhome></PrivateRoot>,
        loader: () => fetch('http://localhost:5000/statistics/admin') 
        
      },  


    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </HelmetProvider>
      </QueryClientProvider>
      </React.StrictMode>,
)

