//ocupa tener un link que te lleve al registro
//Ocupa tener un reestablecer contraseña??? no necesariamente tal vez en configuración

//ocupo conectarme al backend para que compruebe que todo bien
//Revisar que la profetricula sea de 9 (ej: LA01255302 )  (ejMalo: A012) )

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";


interface Props {};

const Login_Profesor = (_props: Props) => {
    
    const [nomina, setNomina] = useState("");
    const [isNominaValid, setIsNominaValid] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    //Verifica si el estado "nomina" tiene el formato L + 8 dígitos
    const handleNominaChange = (nomina) => {
        const value = nomina.target.value;
        setNomina(value);
        const pattern = /^L\d{8}$/;
        setIsNominaValid(pattern.test(value));
    };

    //En caso de que no sea un formato válido no permitirá el post a la api
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isNominaValid) {
            alert("INGRESE UNA NÓMINA VÁLIDA");
            return;
        }
        window.location.href = ("/micuenta")
    };

    return (
        <>
        <div className="background-login container-fluid d-flex justify-content-center align-content-center align-items-center">
            <form 
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center top-50 start-50 box-shadow"
                style={{ background: "linear-gradient(#e0e0e0, #c0c0c0)", width: "100vh", height: "80vh" }}
            >
                <h1>Log-In Profesores</h1>

                <label>Nomina</label>
                <input 
                    type="text"
                    //Lo escrito aqui se vuelve el estado nomina
                    value={nomina}
                    onChange={handleNominaChange}
                    placeholder="ej. L01255302"
                    required
                />
                {/*Campo que permite visualizar si el formato es válido o no antes de enviarlo */}
                <span className="validity" style={{ color: isNominaValid ? "green" : "red" }}>
                    {isNominaValid ? "Nómina válida" : "Nómina inválida"}
                </span>

                <label>Contraseña</label>
                <input 
                    type={showPwd ? "text" : "password"} 
                    placeholder="Contraseña" 
                    required 
                />
                {/*Modifica el estado de visibilidad de la contraseña */}
                <div onClick={() => setShowPwd(!showPwd)} style={{ cursor: "pointer" }}>
                    {showPwd ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </div>

                <button type="submit">Submit</button>
                <Link to="/registro">Registrate aquí</Link>
            </form>
        </div>
        </>
    );
}

export default Login_Profesor;