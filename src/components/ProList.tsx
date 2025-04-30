import { Profesor } from "my-types";

interface ListProps {
  profesores: Array<Profesor>;
  onDelete: (id: number, username: string) => void;
}

export default function ProList({ profesores, onDelete }: ListProps) {

  return (
    <>
      {profesores.map((p, index) => (
        <div key={index} className="d-flex producto mx-4 mb-4 p-3 rounded">
          <div className="flex-grow-1 d-flex flex-column justify-content-between ps-3">
            <h2 className="mt-3">
              {p.username}
            </h2>
            <p>{p.id}</p>
            <p>{p.role === "admin" ? "Administrador" : "Usuario"}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <button className="btn">
              Modificar
            </button>
            <button className="btn" onClick={()=>onDelete(p.id, p.username)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
}