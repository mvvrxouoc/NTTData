import { NavLink } from 'react-router-dom';
import { useLogin } from "./useLogin";
import { useForm } from "../../hooks/useForm";
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleLoginHandler } from '../../components/GoogleLoginComponent/useGoogleLoginHandler';

export const LoginPage = () => {
  const { error, onSubmit } = useLogin();
  const { formValue, handleChange } = useForm({ username: '', password: '' });
  const { handleGoogleLogin, error: googleError } = useGoogleLoginHandler();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => handleGoogleLogin(codeResponse),
    onError: () => console.log('Error de Google Login'),
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
    flow: 'auth-code',
  });

  return (
    <div className="form">
      <h1>LOGUEATE</h1>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formValue); }}>
        <input
          type="text"
          value={formValue.username}
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
        />
        <input
          type="password"
          value={formValue.password}
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      <div className="google-login">
        <button onClick={() => login()}>Iniciar sesión con Google</button>
        {googleError && <p className="error">{googleError}</p>}
      </div>

      {error && <p className="error">{error}</p>}
      <div className="segopt">
        <h4>¿No tienes cuenta?</h4>
        <NavLink to="/register">Regístrate</NavLink>
      </div>
    </div>
  );
};
