import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _name } from '../store/slices/userName.slice'

const ProtectedRoutes = () => {
    const userName = useSelector(_name)

    if(userName !== '')return <Outlet />
    else return <Navigate to='/' />

};

export default ProtectedRoutes;