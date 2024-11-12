import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = ({children}: {children: React.ReactNode}) => {

    const { user } = useAuth();

    return user?.userData?.token ? children : <Navigate to="/login"/>
    
}
