import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CredentialResponse } from "@react-oauth/google";

export const useGoogleLoginHandler = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError("Error al obtener credenciales de Google");
      return;
    }

    console.log("Token recibido", credentialResponse.credential);

    try {
      const response = await fetch("http://localhost:4000/api/google-login", {
        method: "POST",
        headers: {"Content-Type": "application/json", },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (response.ok) {
        const loginRes = await response.json();
        login({ user: {
          name: loginRes.user.username, token: loginRes.token,
          email: ""
        } });
        navigate("/private");
      } else {
        setError("Error al iniciar sesión con Google");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error al iniciar sesión con Google");
    }
  };

  return { handleGoogleLogin, error };
};
