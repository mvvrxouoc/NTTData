import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';
import { CalendarSelector } from '../components/GoogleCalendar/CalendarSelector';
import { useGoogleLoginHandler } from '../components/GoogleLoginComponent/useGoogleLoginHandler';

export const UserDataPage = () => {
  const { user } = useAuth();
  const { handleGoogleLogin, error: googleError } = useGoogleLoginHandler();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLogin(codeResponse),
    onError: () => console.log('Error de Google Login'),
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
    flow: 'auth-code',
    redirect_uri: 'http://localhost:5173',
  });

  const userData = user?.userData || user?.google;

  if (!userData) {
    return <div>No hay datos de usuario</div>;
  }

  return (
    <div>
      <div className="datosUsuario">
        <h1>Datos de Usuario</h1>
        <p>Nombre: {userData.name}</p>
        <p>Email: {userData.email}</p>
        {userData.picture && <img src={userData.picture} alt="Foto de perfil" />}
      </div>
      {!user?.google?.token ? (
        <div className="google-login">
          <button onClick={() => login()}>Conectar con Google Calendar</button>
          {googleError && <p className="error">{googleError}</p>}
        </div>
      ) : (
        <CalendarSelector />
      )}
    </div>
  );
};