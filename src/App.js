import React,{createContext,useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceRequestTable from './components/ServiceRequestTable';
import ServiceRequestDetailsPage from './components/ServiceRequestDetailsPage';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import {auth} from './components/firebase';
import RoleBasedSrTable from './components/RoleBasedSrTable';
import "./styles.css";

export const MyLoginContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in using onAuthStateChanged
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      localStorage.setItem('isLoggedIn', !!user);
    });

    return unsubscribe;
  }, []);

  // Retrieve isLoggedIn from localStorage on component mount
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!storedIsLoggedIn);
  }, []);

  return (
    <>
    <MyLoginContext.Provider value={{isLoggedIn}}>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ServiceRequestTable />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/service-request/:id" element={<ServiceRequestDetailsPage />} />
        <Route path="/my-service-request" element={<RoleBasedSrTable/>} />

      </Routes>
    </BrowserRouter>
    </MyLoginContext.Provider>
    </>
  );
}

export default App;
