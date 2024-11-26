import { GoogleCalendarSelector } from "../components/GoogleCalendarSelector";
import { useAuth } from "../hooks/useAuth";


export const UserDataPage = () => {
    const { user } = useAuth();

    const userData = user?.userData || user?.google;

    if (!userData) {
      return <div>No hay datos de usuario</div>
    }

  return (
    <div>
      <div className="datosUsuario">
        <h1>Datos de Usuario</h1>
        <p>Nombre: {userData.name}</p>
        <p>email: {userData.email}</p>
        {userData.picture && <img src={userData.picture} alt="Foto de perfil" />}
      </div>
      <div>
      </div>
    </div>
    
  );
};
