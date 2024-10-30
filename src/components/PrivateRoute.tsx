import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

    const { token } = useAuth();

    return token ? children : <Navigate to="/login"/>
    
}
