import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = ({children}: {children: React.ReactNode}) => {

    const { token } = useAuth();

    return token ? children : <Navigate to="/login"/>
    
}
