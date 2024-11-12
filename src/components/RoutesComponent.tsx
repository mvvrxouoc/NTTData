import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { UserDataPage } from "../pages/UserDataPage";
import { ExamplesPage } from "../pages/ExamplesPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { PrivatePage } from "../pages/PrivatePage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";

export const RoutesComponent = () => {
    const {user} = useAuth();

    return (
        <> 
                <Routes>    
                    {user?.userData?.token ? (
                        <>
                        <Route path="/user-data" element={<UserDataPage />} />
                        <Route path="/examples" element={<ExamplesPage />} />
                        <Route path="/private" element={<PrivateRoute><PrivatePage/></PrivateRoute>} />
                        <Route path="/" element={<Navigate to="/private" />} />
                        </>
                    ) : (
                        <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>

        
        </>
    );
}