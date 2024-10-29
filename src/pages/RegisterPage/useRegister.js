import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ValidationForm } from "../../utils/ValidationForm";
import { useAuth } from "../../hooks/useAuth";

export const useRegister = () => {
  
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register } = useAuth();

    
    const onSubmit = async (formValue) => {

        const validationErrorsRegister = ValidationForm(formValue, "register");
    
        if (Object.keys(validationErrorsRegister).length > 0) {
          setError(Object.values(validationErrorsRegister).join(', '));
          return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/register', {
              method: "POST",
              headers: { "Content-Type": "application/json", },
              body: JSON.stringify(formValue),
            });
            const loginRes = await response.json();
            if (loginRes) {
              register(loginRes);
              navigate('/login');
            } else {
              setError('Error al registrarse');
            }
          }catch (error) {
            console.log(error);
            setError('Error en el servidor');
          }
    }
  
    return {
        onSubmit,
        error
    }
  }