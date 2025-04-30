import { Profesor } from "my-types";
import { use, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface ListProps {
  profesores: Array<Profesor>;
  onDelete: (id: number, username: string) => void;
  onModify: (id: number, username: string, newPassword:string, newRole:string ) => void;
}

export default function ProList({ profesores, onDelete, onModify }: ListProps) {
  const [viewModify, setViewModify] = useState<number | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPwd] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("user");

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    setRole(checked ? "admin" : "user");
  };
  return (
    <>
      {profesores.map((p, index) => (
        <div key={index} className="d-flex producto mx-4 mb-4 p-3 rounded">
          <div className="flex-grow-1 d-flex flex-column justify-content-between ps-3">
            <h2 className="mt-3">{p.username}</h2>
            <p>{p.id}</p>
            <p>{p.role === "admin" ? "Administrador" : "Usuario"}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <button
              className="btn"
              onClick={() => {
                if(viewModify === index){setViewModify(null)}else{
                  setViewModify(index);
                  setIsChecked(p.role === "admin");
                  setRole(p.role);
                  setPwd("");
                }
              }}
            >
              Modificar
            </button>
            <button className="btn" onClick={() => onDelete(p.id, p.username)}>
              Eliminar
            </button>
          </div>
          <div hidden={viewModify !== index}>
            <label>Contraseña</label>
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(p) => setPwd(p.target.value)}
                      placeholder="Contraseña"
                      required
                    />
                    <div onClick={() => setShowPwd(!showPwd)} style={{ cursor: "pointer" }}>
                      {showPwd ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </div>
                    <label>Administrador</label>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    ></input>
                    <button onClick={()=> onModify(p.id,p.username,password,role)}>Submit</button>
          </div>
        </div>
      ))}
    </>
  );
}
