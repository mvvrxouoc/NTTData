import { googleLogin } from "../../api/services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CodeResponse } from "@react-oauth/google";

export const useGoogleLoginHandler = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (codeResponse: CodeResponse) => {
    if (!codeResponse.code) {
      setError("Error al obtener credenciales de Google");
      return;
    }

    try {
      const loginRes = await googleLogin(codeResponse.code);
      const userGoogle = {
        name: loginRes.user.name,
        token: loginRes.token,
        email: loginRes.user.email,
        picture: loginRes.user.picture,
      };
      login({ google: userGoogle });
      console.log("Navegando a /private");
      navigate("/private");
    } catch (err: any) {
      console.error("Error:", err);
      setError("Error al iniciar sesión con Google");
    }
  };

  return { handleGoogleLogin, error };
};
