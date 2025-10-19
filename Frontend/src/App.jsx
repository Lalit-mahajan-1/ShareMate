import Uploadfile from './UploadFiles/uploadfile.jsx'
import Getallnotes from './GetAllNotes/getallnotes.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './Signup/signup.jsx'
import Login from './Login/login.jsx';
import Home from './Home/Home.jsx';
import './App.css'
import Dashboard from './Components/UserMenu/Dashboard.jsx';
import UserInfo from './Components/Navbar/UserInfo.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect,useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Viewnotes from './Components/Viewnotes/Viewnotes.jsx';
import Publicnotes from './Components/PublicNotes/Publicnotes.jsx';

function App() {
  const cliendId = import.meta.env.VITE_CLIENT_ID;
  const [isLogedIn,setIsLogedIn] = useState(false);
  useEffect(()=>{
   const fetchData = async() =>{
        try{
           const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/isLogedIn`,{withCredentials:true});
           setIsLogedIn(res.data.isLogedIn);
        }
        catch(error){}
    }
    fetchData();
  },[])

  const route = createBrowserRouter([
    { path: "/Notes/Upload", element: <Uploadfile /> },

    {
      path: "/Notes/GetAllNotes",
      element: <Getallnotes />
    },

    {
      path: "/user/Signup",
      element: !isLogedIn?<Signup />:<Navigate to="/Notes/GetAllNotes"/>,
    },
    {
      path: "/user/Login",
      element: !isLogedIn?<Login />:<Navigate to="/Notes/GetAllNotes"/>,
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/user/Dashboard/:userId",
      element: <Dashboard />
    },
    {
      path:"/view/:userid/:notesid",
      element:<Viewnotes/>
    },
    {
      path:"/view/publicnotes",
      element:<Publicnotes/>
    }
  ]);

  return (
    <>
      <GoogleOAuthProvider clientId={cliendId}>
            <UserInfo>
              <RouterProvider router={route}> </RouterProvider>
            </UserInfo>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
