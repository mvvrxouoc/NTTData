export const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el inicio de sesión');
    }
  
    const data = await response.json();
    return data.user;
  };
  
  export const register = async (userData: { username: string; password: string; email: string; birthDate: string }) => {
    const response = await fetch('http://localhost:4000/api/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el registro');
    }
  
    const data = await response.json();
    return data;
  };
  
  export const googleLogin = async (code: string) => {
    const response = await fetch('http://localhost:4000/api/google-login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el login con Google');
    }
  
    const data = await response.json();
    return data;
  };