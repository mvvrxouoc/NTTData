import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ValidationForm } from "../../utils/ValidationForm";
import { FormValues } from "../../hooks/useForm";
import { UserDataProps } from "../../types";
import { login as loginService } from "../../api/services/authService";


export const useLogin = () => {
  
  const [error, setError] = useState("")
  const { login }  = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (formValue: FormValues) => {
    const validationErrorsLogin = ValidationForm(formValue, "login");

    if (Object.keys(validationErrorsLogin).length > 0) {
      setError(Object.values(validationErrorsLogin).join(', '));
      return;
    }

    try {
      const loginRes = await loginService(formValue.username, formValue.password);
      const userSpa: UserDataProps= {
        name: loginRes.name,
        token: loginRes.token,
        email: loginRes.email,
        picture: loginRes.picture,
        isAuthenticated: true,
      };
      login({ userSpa });
      console.log("Navegando a /private");
      navigate('/private');
    }catch (err: any) {
      console.log(error);
      setError(err.message || 'Error en el servidor');
    }
  };

  return {
    onSubmit, 
    error
  };
};
