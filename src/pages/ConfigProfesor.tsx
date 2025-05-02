import { logOut } from "../api/ProfesorAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuth} from "../auth/AuthProvider";
import "../styles/index.css"; // Importamos los estilos

interface Props {};

const ConfigProfesor = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return(
        <>
        <h1>Configuración del Profesor</h1>
        <Link to="/game">Ir al Juego</Link>
        <button 
                    className="rampout-btn logout-btn" 
                    onClick={()=>{
                      try{
                        logOut();
                        alert("Logging Out");
                        auth.setIsAuthenticated(false);
                      }
                      catch(e){console.log(e)}
                    }}
                  >
                    LOG OUT
        </button>
        </>
    )
}

export default ConfigProfesor;