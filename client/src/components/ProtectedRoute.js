import React, { useContext } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import appContext from '../context/appContext';

export default function ProtectedRoute() {
    const { authToken } = useContext(appContext);

    if (!authToken && !localStorage.getItem("authToken")) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}
