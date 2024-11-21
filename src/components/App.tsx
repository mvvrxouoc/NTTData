import { AuthProvider } from '../context/AuthContext';
import { Header } from './Header';
import { RoutesComponent } from './RoutesComponent';

export const App = () => {

    return (
        <AuthProvider>
            <Header />
            <RoutesComponent />
        </AuthProvider>     
    );
}


 