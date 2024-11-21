import { GoogleCalendarSelector } from "../components/GoogleCalendarSelector";
import { useAuth } from "../hooks/useAuth";


export const UserDataPage = () => {
    const { user } = useAuth();

  if (!user?.userData) {
    return <div>No hay datos de usuario</div>
  }


  return (
    <div>
      <div>
        <h1>Datos de Usuario</h1>
        <p>Nombre: {user.userData.name}</p>
        <p>email: {user.userData.email}</p>
        {user.userData.picture && <img src={user.userData.picture} alt="Foto de perfil" />}
      </div>
      <div>
      </div>
    </div>
    
  );
};
