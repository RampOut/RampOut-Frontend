import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { getAccess, logIn } from "../api/ProfesorAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login_Profesor.css"; // Import the external CSS file

const Login_Profesor = () => {
  // Validacion de datos del log-in
  const [nomina, setNomina] = useState("");
  const [isNominaValid, setIsNominaValid] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPwd] = useState("");
  // Autorización
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorView, setErrorView] = useState("");

  // Verifica si el estado "nomina" tiene el formato L + 8 dígitos
  const handleNominaChange = (e) => {
    const value = e.target.value;
    setNomina(value);
    const pattern = /^L\d{8}$/;
    setIsNominaValid(pattern.test(value));
  };

  // En caso de que no sea un formato válido no permitirá el post a la api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorView("");
    if (!isNominaValid) {
      alert("INGRESE UNA NÓMINA VÁLIDA");
      return;
    }
    try {
      await logIn(nomina, password);
      const { acceso, role } = await getAccess();
      if (acceso === true) {
        auth.setIsAuthenticated(true);
        navigate("/micuenta");
      } else {
        setErrorView("Acceso Denegado");
      }
    } catch (er) {
      if (axios.isAxiosError(er) && er.response) {
        setErrorView(er.response.data?.message || "Error en log in");
      } else {
        setErrorView("Error en log in");
      }
    }
  };

  return (
    <div className="background-login container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form
              onSubmit={handleSubmit}
              className="login-form-container d-flex flex-column align-items-center"
            >
              <h1 className="login-title">LOG-IN PROFESORES</h1>
              
              {!!errorView && <div className="error-message">{errorView}</div>}
              
              <div className="input-group">
                <label className="input-label">NÓMINA</label>
                <input
                  className="form-input"
                  type="text"
                  value={nomina}
                  onChange={handleNominaChange}
                  placeholder="ej. L01255302"
                  required
                />
                <span
                  className={`validity-message ${isNominaValid ? 'valid' : 'invalid'}`}
                >
                  {isNominaValid ? "Nómina válida" : "Nómina inválida"}
                </span>
              </div>

              <div className="input-group">
                <label className="input-label">CONTRASEÑA</label>
                <div className="position-relative w-100">
                  <input
                    className="form-input"
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(p) => setPwd(p.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                  <div
                    onClick={() => setShowPwd(!showPwd)}
                    className="password-toggle"
                  >
                    <FontAwesomeIcon icon={showPwd ? faEye : faEyeSlash} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
              >
                SUBMIT
              </button>
              
              <Link
                to="/login/admin"
                className="admin-link text-decoration-none"
              >
                Ingresa como Administrador
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_Profesor;