import api from "./index";
import { Profesor } from "my-types";

//Para realizar el CRUD de profesores necesitas a un profesor sin proteger que sirva de administrador, usando su token se podran realizar acciones como agregar, modificar o eliminar los elementos 

//Que hago si no está registrado (no ocupa token)
//Endpoint: http://localhost:3000/api/register

export const register = async(host: Profesor) => {
    try{
        const res= await api.post("api/register", {username: host.username, password: host.password});
    }
    catch (e){
        console.log("Error durante al registrar al profesor único:", e)
    }
}

//Obtienes el token de dicho profesor
export const logIn = async (username:string, password: string) => {
    try{
        const res= await api.post("api/login", {username, password});
        const token = res.data.token;
        localStorage.setItem("token",token);
        return token;
    }
    catch (e){
        throw e;
    }
} 

//El token se usará como header del resto de las llamadas
/*api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (e) => {
      return Promise.reject(e);
    }
  );*/

// Obtener el host por ID. (R)
export const getHostById = async(id: number) => {
    try {
        const res = await api.get(`/api/host/${id}`);
        const host: Profesor = await res.data.payload;
        return host;
    } catch(e) {
        console.log("Error al obtener la información del host:", e);
        return null;
    }
}

//Crear el host (C)
export const createHost = async(host:Profesor ) => {
    try{
        await api.post("/api/host", host);
    }catch (e) {
        console.log("Error al registrar al profesor", e)
    }
}

//Actualizar Contraseña (U)
export const updateHostPassword = async(id: number, newPassword: string): Promise<void> => {
    try {
        await api.patch(`/api/host/${id}`, {newPassword});
    } catch(e) {
        console.log("Error al actualizar la contraseña:", e);
    }
}

//Eliminar Profesor (D)
export const deleteHost = async (id: number): Promise<void> => {
    try {
        await api.delete(`/api/host/${id}`);
    } catch (e) {
        console.log("Error al eliminar el profesor:", e);
    }
};

//Verifica el acceso, el endpoint da valores en booleanos
export const getAccess = async() => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }
        const res = await api.get("api/host",{
            headers:
            {Authorization: `Bearer ${token}`}
        });
        return res.data.payload === true;
    } catch(e) {
        console.log("Error al obtener verficación de acceso:", e);
        return false;
    }
}

//Log Out
export const logOut = async (id: number) => {
    try {
      const res = await api.post(`/api/host/${id}`);
      localStorage.removeItem("token"); //Eliminar token en memoria local
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
