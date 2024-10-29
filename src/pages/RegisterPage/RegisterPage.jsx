
import { NavLink } from 'react-router-dom';
import { useRegister } from './useRegister';
import { useForm } from '/src/hooks/useForm';
import DatePickerInput from '../../components/DatePicker'

export const RegisterPage = () => {

  const { formValue, handleChange } = useForm({username:'', password:'', email:'', birthDate: null})
  const { onSubmit, error } = useRegister();

  return (
    <div className="form">
      <h1>REGISTRATE</h1>
        <form onSubmit={(e) => {e.preventDefault(), onSubmit(formValue)}}>
            <input 
              type="text" 
              name="username"
              value={formValue.username} 
              placeholder="Usuario" 
              onChange={handleChange}/>
            <input 
              type="email" 
              name="email"
              value={formValue.email}  
              placeholder="Email" 
              onChange={handleChange}/>
            <input 
              type="password" 
              name="password"
              value={formValue.password} 
              placeholder="Contraseña" 
              onChange={handleChange}/>
              
            <DatePickerInput
              label="Fecha de nacimiento"
              value={formValue.birthDate}
              onChange={(newValue) => {
                handleChange({target: {name: 'birthDate', value: newValue}});
              }}
              />
                
            <button type="submit">Registrarse</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="segopt">
          <h4>¿Ya tienes cuenta?</h4>
          <NavLink to="/login">Iniciar sesión</NavLink>
        </div>
    </div>
  ); 
}
