
import { NavLink } from 'react-router-dom';
import { useLogin } from "./useLogin";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {

  const {error, onSubmit} = useLogin();
  const {formValue, handleChange} = useForm({username: '', password:''})

  return (
    <div className="form">
      <h1>LOGUEATE</h1>
      <form onSubmit={(e) => {e.preventDefault(); onSubmit(formValue);}}>
        <input 
          type="text" 
          value={formValue.username} 
          name="username" 
          placeholder="Usuario"
          onChange={handleChange} />

        <input 
          type="password" 
          value={formValue.password} 
          name="password" 
          placeholder="Contraseña"
          onChange={handleChange}/>

        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="segopt">
        <h4>¿No tienes cuenta?</h4>
        <NavLink to="/register">Regístrate</NavLink>
      </div>
    </div>
  ); 
}
