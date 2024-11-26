import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = ({children}: {children: React.ReactNode}) => {

    const { user } = useAuth();

    console.log("Estado del usuario en PrivateRoute:", user);

    const isAuthenticated = user?.userData?.token || user?.google?.token;

    return isAuthenticated ? children : <Navigate to="/login"/>
    
}
