
export interface UserDataProps {
	name: string;
	token: string;
	isAuthenticated: boolean;
	email: string;
	picture?: string;
}
  
export interface UserGoogleProps {
	name: string;
	token: string;
	email: string;
	picture: string;
	accessToken?: string; // Puedes almacenar el accessToken si es necesario
  }
  
export interface UserProps {
	userSpa?: UserDataProps,
	userData?: UserDataProps,
	google?: UserGoogleProps,
}
  