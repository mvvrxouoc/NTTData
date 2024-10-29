import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { ValidationForm } from "../../utils/ValidationForm";

export const useLogin = () => {
  
  const [error, setError] = useState("")
  const {login} = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (formValue) => {

    const validationErrorsLogin = ValidationForm(formValue, "login");

    if (Object.keys(validationErrorsLogin).length > 0) {
      setError(Object.values(validationErrorsLogin).join(', '));
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(formValue),
      });
      
      if (response.ok) {
        const loginRes = await response.json();
        login(loginRes.token);
        navigate('/private');
      } else {
        setError('Datos incorrectos');
      }
    }catch (error) {
      console.log(error);
      setError('Error en el servidor');
    }
    
  }
  return {
    onSubmit, error
  }
}
