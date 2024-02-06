import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';
import Login from '../pages/Login';
import Department from '../pages/Department';
import Employee from '../pages/Employee';
import Leaves from '../pages/Leaves';
import Tickets from '../pages/Tickets';
import Dashboard from '../pages/Dashboard';
import LeaveForApprovel from '../pages/LeaveForApprovel';







const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Login/>}></Route>
                    <Route path='dashboard' element={<Dashboard/>}></Route>
                    <Route path='department' element={<Department/>} ></Route>
                    <Route path='employee' element={<Employee/>}></Route>
                    <Route path='leave' element={<Leaves/>}></Route>
                    <Route path='ticket' element={<Tickets/>}></Route>
                    <Route path='approve' element={<LeaveForApprovel/>}></Route>


                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;