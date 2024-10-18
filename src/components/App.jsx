import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { PrivatePage } from './PrivatePage';


export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/private" element={<PrivatePage />} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
