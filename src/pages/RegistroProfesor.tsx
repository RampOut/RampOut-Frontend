import { use, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { createHost } from "../api/ProfesorAPI";
import axios from "axios";

interface Props {}

const RegistroProfesor = (_props: Props) => {
  const [nomina, setNomina] = useState("");
  const [isNominaValid, setIsNominaValid] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPwd] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("user");
  //Muestra el error
  const [errorView, setErrorView] = useState("");

  const navigate = useNavigate();

  const handleNominaChange = (nomina) => {
    const value = nomina.target.value;
    setNomina(value);

    const pattern = /^L\d{8}$/;
    setIsNominaValid(pattern.test(value));
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setRole(checked ? "admin" : "user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNominaValid) {
      alert("INGRESE UNA NÓMINA VÁLIDA");
      return;
    }

    try {
      const data = await createHost(nomina, password, role);
      console.log(data);
      if (data) {
        alert("Profesor creado correctamente");
        navigate("/admin");
      }
    } catch (er) {
      if (axios.isAxiosError(er) && er.response) {
        setErrorView(er.response.data?.message || "Error en Registro");
      } else {
        setErrorView("Error Registro");
      }
    }
  };

  return (
    <div className="background-login container-fluid d-flex justify-content-center align-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center top-50 start-50 box-shadow"
        style={{
          background: "linear-gradient(#603e91,rgb(99, 142, 197))",
          width: "100vh",
          height: "80vh",
        }}
      >
        <div className="mt-3">
          <h1>Registro Profesores</h1>
        </div>
        {!!errorView && <p>{errorView}</p>}
        <label>Nomina</label>
        <div className="py-2">
        <input
          type="text"
          value={nomina}
          onChange={handleNominaChange}
          placeholder="ej. L01255302"
          required
        />
        </div>
        <div className="pb-3">
        <span
          className="validity"
          style={{ color: isNominaValid ? "#43ba14" : "#ba1f14" }}
        >
          {isNominaValid ? "Nómina válida" : "Nómina inválida"}
        </span>
        </div>

        <label>Contraseña</label>
        <div className="py-2">
        <input
          type={showPwd ? "text" : "password"}
          value={password}
          onChange={(p) => setPwd(p.target.value)}
          placeholder="Contraseña"
          required
        />
        </div>
        <div onClick={() => setShowPwd(!showPwd)} style={{ cursor: "pointer" }}>
          {showPwd ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>
        <label>Crear como Administrador</label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        ></input>

        <button type="submit" className="m-2 p-2">Submit</button>
        <Link to="/admin">Regresar</Link>
      </form>
    </div>
  );
};

export default RegistroProfesor;
