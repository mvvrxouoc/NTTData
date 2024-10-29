import { Route, Routes, Navigate, Router } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { PrivatePage } from '../pages/PrivatePage';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from '../context/AuthContext';

export const App = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/private" element={<PrivateRoute><PrivatePage/></PrivateRoute>} />

                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
        </AuthProvider>     
    );
}
