import { Profesor } from "my-types";
import { use, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.css";


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
       <div className="pro-list">
      {profesores.length === 0 ? (
        <div className="no-data-message">
          <p>No hay profesores que coincidan con el filtro</p>
        </div>
      ) : (
        profesores.map((p, index) => (
          <div key={index} className={`profesor-card ${viewModify === index ? 'expanded' : ''}`}>
            <div className="profesor-info">
              <div className="profesor-header">
                <h3 className="profesor-name">{p.username}</h3>
                <div className="profesor-badge">
                  {p.role === "admin" ? "ADMIN" : "USER"}
                </div>
              </div>
              <div className="profesor-id">ID: {p.id}</div>
            </div>
            
            <div className="profesor-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => {
                  if (viewModify === index) {
                    setViewModify(null);
                  } else {
                    setViewModify(index);
                    setIsChecked(p.role === "admin");
                    setRole(p.role);
                    setPwd("");
                  }
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span className="btn-label">Modificar</span>
              </button>
              
              <button 
                className="action-btn delete-btn"
                onClick={() => onDelete(p.id, p.username)}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className="btn-label">Eliminar</span>
              </button>
            </div>
            
            <div className={`modify-panel ${viewModify === index ? 'show' : ''}`}>
              <div className="modify-form">
                <div className="form-group">
                  <label className="form-label">Contraseña</label>
                  <div className="password-input-group">
                    <input
                      type={showPwd ? "text" : "password"}
                      className="retro-input"
                      value={password}
                      onChange={(p) => setPwd(p.target.value)}
                      placeholder="Nueva contraseña"
                      required
                    />
                    <button
                      className="visibility-toggle"
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      <FontAwesomeIcon icon={showPwd ? faEye : faEyeSlash} />
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <span className="checkbox-container">
                      <input
                        type="checkbox"
                        className="retro-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                    </span>
                    Administrador
                  </label>
                </div>
                
                <button 
                  className="submit-btn" 
                  onClick={() => onModify(p.id, p.username, password, role)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span className="btn-label">Guardar Cambios</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
}
