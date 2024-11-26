import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ValidationForm } from "../../utils/ValidationForm";
import { FormValues } from "../../hooks/useForm";
import { register as registerService } from "../../api/services/authService";

export const useRegister = () => {
  
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const onSubmit = async (formValue: FormValues) => {
        const validationErrorsRegister = ValidationForm(formValue, "register");
    
        if (Object.keys(validationErrorsRegister).length > 0) {
          setError(Object.values(validationErrorsRegister).join(', '));
          return;
        }

        try {
          await registerService(formValue);
          navigate('/login');
        } catch (err: any) {
          console.log(err);
            setError(err.message || 'Error en el servidor');
        }
    };
  
    return {
        onSubmit,
        error
    }
  }