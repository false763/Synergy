import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceRequestTable from './components/ServiceRequestTable';
import ServiceRequestDetailsPage from './components/ServiceRequestDetailsPage';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import RoleBasedSrTable from './components/RoleBasedSrTable';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
